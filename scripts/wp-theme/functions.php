<?php
/**
 * Noor Al-Thaqalain theme bootstrap.
 *
 * The site itself is a pre-built React bundle in ./assets (produced by
 * `pnpm export:build`). This file only registers theme support and enqueues the
 * hashed JS/CSS listed in the Vite manifest, so no Node runtime is needed on
 * the WordPress host.
 *
 * @package Noor_Al_Thaqalain
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function noor_theme_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support(
		'html5',
		array( 'script', 'style', 'gallery', 'caption' )
	);
}
add_action( 'after_setup_theme', 'noor_theme_setup' );

/**
 * Reads the Vite build manifest (assets/.vite/manifest.json).
 *
 * @return array<string, array<string, mixed>>
 */
function noor_theme_manifest() {
	static $manifest = null;

	if ( null !== $manifest ) {
		return $manifest;
	}

	$path     = get_template_directory() . '/assets/.vite/manifest.json';
	$manifest = array();

	if ( is_readable( $path ) ) {
		$decoded = json_decode( (string) file_get_contents( $path ), true ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		if ( is_array( $decoded ) ) {
			$manifest = $decoded;
		}
	}

	return $manifest;
}

function noor_theme_enqueue() {
	$base     = get_template_directory_uri() . '/assets/';
	$manifest = noor_theme_manifest();
	$entry    = isset( $manifest['index.html'] ) ? $manifest['index.html'] : null;

	wp_enqueue_style( 'noor-theme', get_stylesheet_uri(), array(), '1.0.0' );

	if ( ! is_array( $entry ) || empty( $entry['file'] ) ) {
		return;
	}

	if ( ! empty( $entry['css'] ) && is_array( $entry['css'] ) ) {
		foreach ( $entry['css'] as $index => $css_file ) {
			wp_enqueue_style( 'noor-app-' . $index, $base . $css_file, array(), null );
		}
	}
}
add_action( 'wp_enqueue_scripts', 'noor_theme_enqueue' );

/**
 * The app is an ES module, so it is printed in the footer instead of being
 * loaded through wp_enqueue_script (which does not emit type="module").
 */
function noor_theme_print_module() {
	$base     = get_template_directory_uri() . '/assets/';
	$manifest = noor_theme_manifest();
	$entry    = isset( $manifest['index.html'] ) ? $manifest['index.html'] : null;

	if ( ! is_array( $entry ) || empty( $entry['file'] ) ) {
		echo '<p style="padding:2rem;font-family:sans-serif">' .
			esc_html__( 'فایل‌های ساخته‌شده یافت نشد. لطفاً پوشه assets را از بسته خروجی در پوشه قالب قرار دهید.', 'noor-al-thaqalain' ) .
			'</p>';
		return;
	}

	printf(
		'<script type="module" crossorigin src="%s"></script>',
		esc_url( $base . $entry['file'] )
	);
}
add_action( 'wp_footer', 'noor_theme_print_module', 20 );

/**
 * Persian document language for the whole theme, independent of the WP locale
 * setting (the markup is Persian either way).
 */
function noor_theme_language_attributes( $output ) {
	return 'lang="fa-IR" dir="rtl"';
}
add_filter( 'language_attributes', 'noor_theme_language_attributes' );
