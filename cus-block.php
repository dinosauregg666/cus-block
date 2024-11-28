<?php
/**
 * Plugin Name: custom block
 */

if(!defined('ABSPATH')) exit;

class CusBlock {
    function __construct() {
        add_action('init', array($this, 'adminAssets'));
    }
    function adminAssets() {
        wp_register_style('cusblockcss', plugin_dir_url(__FILE__) . 'build/index.css');
        wp_register_script('cusblockscript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
        register_block_type('my-namespace/my-block', array(
            'editor_script' => 'cusblockscript',
            'editor_style' => 'cusblockcss',
            'render_callback' => array($this, 'theHTML')
        ));
    }
    function theHTML($attributes) {
        ob_start(); ?>

        <p> <?php echo esc_html($attributes['skyColor'] . $attributes['grassColor']); ?> </p>;

        <?php return ob_get_clean();
    }
}

$cusBlock = new CusBlock();