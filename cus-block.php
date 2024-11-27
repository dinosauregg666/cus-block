<?php
/**
 * Plugin Name: custom block
 */

if(!defined('ABSPATH')) exit;

class CusBlock {
    function __construct() {
        add_action('enqueue_block_editor_assets', array($this, 'adminAssets'));
    }
    function adminAssets() {
        wp_enqueue_script('cusblockscript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks'));
    }
}

$cusBlock = new CusBlock();