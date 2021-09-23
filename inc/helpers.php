<?php

function get_random_icons($count=1, $theme='original') {
  $collection = [];
  $path = get_template_directory_uri().'/static/icons/pop/'.$theme.'/' ;
  for ($i=0; $i < $count; $i++) {
    $target = rand(1,47);
    $value = $path . str_pad((string)$target, 2, '0', STR_PAD_LEFT) . '.svg';
    array_push($collection, $value);
  }
  return $collection;
}

function get_random_colour () {
  $colours = [
    // 'green',
    'pink',
    'blue',
    // 'yellow',
    'purple'
  ];
  $i = rand(0, count($colours) - 1);
  return $colours[$i];
}

function case_study_title ($title, $client, $category) {
  return str_replace($client, '<strong>'.$client.'. </strong>'.$category, $title);
}
