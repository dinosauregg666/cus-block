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
//        wp_register_style('cusblockcss', plugin_dir_url(__FILE__) . 'build/index.css');
//        wp_register_script('cusblockscript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
        register_block_type(__DIR__, array(
//            'editor_script' => 'cusblockscript',
//            'editor_style' => 'cusblockcss',
            'render_callback' => array($this, 'theHTML')
        ));
    }
    function theHTML($attributes) {
        // 这里的脚本只会在执行这个函数的时候加载，也就是前端博客有放置这个模块的页面才会加载这个脚本
//        if(!is_admin()) { // 只有在不是后台的情况下，才会执行以下代码
//            wp_enqueue_script('cusBlockFrontendJs', plugin_dir_url(__FILE__) . 'build/frontend.js',                 array('wp-element'));
//            wp_enqueue_style('cusBlockFrontendCss', plugin_dir_url(__FILE__) . 'build/frontend.css');
//        }

        ob_start(); ?>

        <p> <?php echo esc_html($attributes['skyColor'] . $attributes['grassColor']); ?> </p>
        <div class="cus-frontend-block"><pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre></div>
        <?php return ob_get_clean();
    }
}

$cusBlock = new CusBlock();