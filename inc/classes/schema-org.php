<?php

  class Site_Schema_Org {

    function __construct()	{

      add_action('wp_head', array($this, 'output_organization_schema'), 5);
      add_action('wp_head', array($this, 'output_glossary_schema'), 20);

    }

    public function output_organization_schema() {

      $site_url = home_url('/');

      // Reuse the same option field the footer's "Call us" link uses, normalised to E.164 (e.g. "+448000437599").
      $telephone_raw = get_field('telephone_number_for_links', 'option') ?: 'tel:448000437599';
      $telephone = '+' . preg_replace('/\D/', '', $telephone_raw);

      $linkedin  = get_field('linkedin_link', 'option') ?: 'https://www.linkedin.com/company/popcomms';
      $youtube   = get_field('youtube_link', 'option') ?: 'https://www.youtube.com/user/popcomms';
      $instagram = get_field('instagram_link', 'option') ?: 'https://www.instagram.com/wearepopcomms/';

      // TODO: replace with a proper brand logo file once one is supplied. Falling back to the
      // site's square icon so the logo/image properties aren't left empty.
      $logo = get_stylesheet_directory_uri() . '/static/favicon/android-chrome-512x512.png';

      $site_name = get_bloginfo('name') ?: 'POPcomms';

      $data = [
        '@context' => 'https://schema.org',
        '@graph' => [
          [
            '@type' => 'Organization',
            '@id'   => $site_url . '#organization',
            'name'  => $site_name,
            'url'   => $site_url,
            'logo'  => $logo,
            'image' => $logo,
            'telephone' => $telephone,
            'address' => [
              '@type' => 'PostalAddress',
              'streetAddress'   => '155 Whiteladies Rd, Redland',
              'addressLocality' => 'Bristol',
              'postalCode'      => 'BS8 2RF',
              'addressCountry'  => 'GB',
            ],
            'sameAs' => [
              $youtube,
              $instagram,
              $linkedin,
            ],
          ],
          [
            '@type' => 'WebSite',
            '@id'   => $site_url . '#website',
            'url'   => $site_url,
            'name'  => $site_name,
            'publisher' => [
              '@id' => $site_url . '#organization',
            ],
          ],
        ],
      ];

      echo '<script type="application/ld+json">'
        . wp_json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
        . '</script>';

    }

    public function output_glossary_schema() {

      if (!is_singular('glossary')) {
        return;
      }

      $post_id = get_the_ID();
      $url     = get_permalink($post_id);
      $title   = get_the_title($post_id);

      // ALWAYS use excerpt as definition
      $description = get_the_excerpt($post_id);
      $description = wp_strip_all_tags($description);

      // If no excerpt exists, stop outputting schema
      // (Glossary entries should always have one)
      if (empty($description)) {
        return;
      }

      // Optional: pull synonyms from ACF field "glossary_synonyms"
      $synonyms = get_field('glossary_synonyms', $post_id);
      $alternate_names = [];

      if (!empty($synonyms)) {
        // Accept comma-separated string or array
        if (is_string($synonyms)) {
          $alternate_names = array_map('trim', explode(',', $synonyms));
        } elseif (is_array($synonyms)) {
          $alternate_names = array_map('trim', $synonyms);
        }
      }

      $data = [
        '@context' => 'https://schema.org',
        '@type'    => 'DefinedTerm',
        '@id'      => $url . '#definedterm',
        'name'     => $title,
        'description' => $description,
        'url'      => $url,
        'inLanguage' => 'en-GB',
        'mainEntityOfPage' => [
          '@type' => 'WebPage',
          '@id'   => $url
        ],
        'inDefinedTermSet' => [
          '@type' => 'DefinedTermSet',
          'name'  => 'POPcomms Glossary',
          'url'   => home_url('/glossary/')
        ],
      ];

      if (!empty($alternate_names)) {
        $data['alternateName'] = $alternate_names;
      }

      echo '<script type="application/ld+json">'
        . wp_json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
        . '</script>';

    }

  }

  new Site_Schema_Org();
