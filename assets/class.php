<?php defined('ABSPATH') or die('No script kiddies please!');
/**
 * @package WordPress
 * @subpackage Compare Images for Gutenberg
 *
 * @author RapidDev | Polish technology company
 * @copyright Copyright (c) 2018, RapidDev
 * @link https://www.rapiddev.pl/en/compare
 * @license https://opensource.org/licenses/MIT
 */

/*
Copyright 2019 RapidDev Leszek Pomianowski

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

	if(!class_exists('RAPIDDEV_COMPARE'))
	{
		class RAPIDDEV_COMPARE
		{
			public static function init()
			{
				return new RAPIDDEV_COMPARE();
			}

			public function __construct()
			{
				add_action('plugins_loaded', array($this,'languages'));
				add_action('init', array($this,'compare_block_register'));
				add_filter('block_categories', array($this, 'gutenberg_category'), 10, 2);
				add_action('wp_enqueue_scripts', array($this, 'register_scripts'));
				add_action('admin_enqueue_scripts', array($this, 'register_admin_scripts'));
				add_action('init', array($this, 'js_translations'));
			}

			public function languages()
			{
				load_plugin_textdomain('rd_compare',FALSE,basename(RAPIDDEV_COMPARE_PATH).'/languages/');
			}

			public function compare_block_register()
			{
				wp_register_script('rapiddev-compare', RAPIDDEV_COMPARE_URL.'assets/compare.js', array('wp-blocks', 'wp-element', 'wp-editor', 'wp-i18n', 'wp-components'));
				register_block_type('rapiddev-gutenberg/rapiddev-compare', array('editor_script' => 'rapiddev-compare'));
			}

			public function gutenberg_category($categories, $post)
			{
				if ( $post->post_type !== 'post' ) {
					return $categories;
				}
				return array_merge($categories, array(array('slug' => 'rapiddev-compare', 'title' => __('Compare images', 'rd_compare'))));
			}

			public function register_scripts()
			{
				wp_register_script('jQuery', 'https://code.jquery.com/jquery-3.3.1.min.js', NULL, '3.3.1', true);
				wp_register_script('RD_Compare', plugins_url('/rapiddev.twentytwenty.js', __FILE__), NULL, '1.0.0', true);
				wp_enqueue_script('jQuery');
				wp_enqueue_script('RD_Compare');
				wp_enqueue_style( 'twentytwenty', plugins_url('/twentytwenty.css', __FILE__));
			}

			public function register_admin_scripts()
			{
				global $pagenow;
				if (( $pagenow == 'post.php' ) || (get_post_type() == 'post')) {
					wp_register_script('RD_Compare', plugins_url('/rapiddev.twentytwenty.js', __FILE__), array(), '1.0.0', true);
					wp_enqueue_style( 'twentytwenty', plugins_url('/twentytwenty.css', __FILE__));
				}
			}

			public function js_translations()
			{
				wp_set_script_translations( 'rapiddev-compare', 'rd_compare');
			}
		}
	}
