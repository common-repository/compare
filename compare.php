<?php
/*
Plugin Name: Compare Images for Gutenberg
Plugin URI: http://wordpress.org/plugins/compare/
Description: Add flexible image comparison in your Gutenberg editor... It's easy!
Author: RapidDev
Author URI: https://rapiddev.pl/en/
License: MIT
License URI: https://opensource.org/licenses/MIT
Version: 1.0.1
Text Domain: rd_compare
Domain Path: /languages
*/
/**
 * @package WordPress
 * @subpackage Compare Images for Gutenberg
 *
 * @author RapidDev | Polish technology company
 * @copyright Copyright (c) 2018, RapidDev
 * @link https://www.rapiddev.pl/en/compare
 * @license https://opensource.org/licenses/MIT
 */

/* ====================================================================
 * Constant
 * ==================================================================*/
	define('RAPIDDEV_COMPARE_PATH', plugin_dir_path(__FILE__));
	define('RAPIDDEV_COMPARE_URL', plugin_dir_url( __FILE__ ));

/* ====================================================================
 * Plugin class
 * ==================================================================*/
	if (is_file(RAPIDDEV_COMPARE_PATH.'assets/class.php')) {
		include(RAPIDDEV_COMPARE_PATH.'assets/class.php');
		RAPIDDEV_COMPARE::init();
	}
?>