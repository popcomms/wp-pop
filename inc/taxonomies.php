<?php

// Client Taxonomy

function custom_client_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Clients', 'Taxonomy General Name', 'wp-pop' ),
		'singular_name'              => _x( 'Client', 'Taxonomy Singular Name', 'wp-pop' ),
		'menu_name'                  => __( 'Clients', 'wp-pop' ),
		'all_items'                  => __( 'All Clients', 'wp-pop' ),
		'parent_item'                => __( 'Parent Client', 'wp-pop' ),
		'parent_item_colon'          => __( 'Parent Client:', 'wp-pop' ),
		'new_item_name'              => __( 'New Client Name', 'wp-pop' ),
		'add_new_item'               => __( 'Add New Client', 'wp-pop' ),
		'edit_item'                  => __( 'Edit Client', 'wp-pop' ),
		'update_item'                => __( 'Update Client', 'wp-pop' ),
		'view_item'                  => __( 'View Client', 'wp-pop' ),
		'separate_items_with_commas' => __( 'Separate Clients with commas', 'wp-pop' ),
		'add_or_remove_items'        => __( 'Add or remove Clients', 'wp-pop' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'wp-pop' ),
		'popular_items'              => __( 'Popular Clients', 'wp-pop' ),
		'search_items'               => __( 'Search Clients', 'wp-pop' ),
		'not_found'                  => __( 'Not Found', 'wp-pop' ),
		'no_terms'                   => __( 'No Clients', 'wp-pop' ),
		'items_list'                 => __( 'Clients list', 'wp-pop' ),
		'items_list_navigation'      => __( 'Clients list navigation', 'wp-pop' ),
	);
	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => false,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => false,
	);
	register_taxonomy( 'client', array( 'case-studies' ), $args );

}
add_action( 'init', 'custom_client_taxonomy', 0 );
