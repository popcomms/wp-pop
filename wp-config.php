<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'dbs1725949' );

/** MySQL database username */
define( 'DB_USER', 'dbu1257716' );

/** MySQL database password */
define( 'DB_PASSWORD', 'sqam9phib.REES1wir' );

/** MySQL hostname */
define( 'DB_HOST', 'db5002126858.hosting-data.io' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Fa,q/Svf]/QfJO`7<T3qT{:>B3@U452dmZK~YTSy<X,cOO,,6vxWSXK7ADDq~S5V' );
define( 'SECURE_AUTH_KEY',  'HF8./@fkkT$_+PzXp+Q1L_*qC|aLa5L{Il=w+$KN:lU-jGpK-S%cY:~B|k+;}bKo' );
define( 'LOGGED_IN_KEY',    'hLdqtpW mi+H#vK.A (BNKyp+I.V`u&Q.4PwN6j3t?B_L}0gG@PW{w]6CLd0ny8)' );
define( 'NONCE_KEY',        'wot7T[Arm8_6#B0e;+<2`Hmg=1<ibG.QO2sJd:KG??Upe`:tiu/Z/0p*#+XfA_}`' );
define( 'AUTH_SALT',        ';(?VVz_kRS>1T=M4wB]nv/d|sHpnpz=VL!U/Re.n1nuczr{TKpbmZhFmnY*YV!Hr' );
define( 'SECURE_AUTH_SALT', ']%J}VKhVJJ} e62A?TMti.#dKn!RGwRC>p!c/N{=)?0]TDWGkgUA^E7Kd-Y6E%Z]' );
define( 'LOGGED_IN_SALT',   'l[W?FkNmip2wNavRl#YEqP6`;Tg.yp|-GFb$La3O;E?+JvYbEJs2PNYk!Q~(`Cz/' );
define( 'NONCE_SALT',       'RLvX`Q|a$_dw%#A7*SkaEUBQ~Y--w=GBtF+fDMuAG7!52D2a+:M3}rAB23#^G3)k' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'pop_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
