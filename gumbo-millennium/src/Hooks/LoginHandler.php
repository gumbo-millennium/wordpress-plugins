<?php
declare (strict_types = 1);

namespace Gumbo\Plugin\Hooks;

use Gumbo\Plugin\PostTypes\PostType;
use Gumbo\Plugin\PostTypes\Sponsor;
use Ramsey\Uuid\Uuid;
use WP_User;

/**
 * Restricts login options and adds support for password_hash login
 *
 * @author Roelof Roos <github@roelof.io>
 * @license MPL-2.0
 */
class LoginHandler extends AbstractHook
{
    /**
     * Bind to WordPress
     *
     * @return void
     */
    public function bind() : void
    {
        // Disable password reset on form and submit
        add_action('lost_password', [$this, 'redirectForgotPassword']);
        add_action('lostpassword_post', [$this, 'redirectForgotPassword']);

        // Remove forgot password link via Javascript
        add_action('login_footer', [$this, 'removeResetPasswordLink']);

        // Always return false on can-register option
        add_filter('option_users_can_register', function () {
            return false;
        }, 99);

        // Redirect logout URL to site admin
        add_filter('logout_redirect', function () {
            return home_url('/admin/wordpress', 'http');
        }, 99);

        // Add support for password_verify
        add_filter('check_password', [$this, 'validate'], 15, 3);
    }

    public function redirectForgotPassword()
    {
        wp_redirect(site_url('wp-login.php?forgot=disabled'));
        exit();
    }

    /**
     * Validates password
     *
     * @param bool $check
     * @param string $password
     * @param string $hash
     * @return bool
     */
    public function validate($check, $password, $hash) : bool
    {
        // Return false if the account is locked ("!" as password)
        if ($hash === '!') {
            return false;
        }

        // Return check if check is true
        if ($check) {
            return true;
        }

        // Validate password if hash isn't empty
        return empty($hash) ? false : password_verify($password, $hash);
    }

    /**
     * Performs the actual login
     *
     * @param WP_User $user
     * @return void
     */
    protected function login(WP_User $user) : void
    {
        global $auth_secure_cookie;

        // Determine 'secure' cookie
        $secureCookie = is_ssl();

        // Ask plugins
        $secureCookie = apply_filters('secure_signon_cookie', $secureCookie, [
            'user_login' => $user->user_login,
            'user_password' => '',
            'remember' => false
        ]);

        // Forward to WordPress
        $auth_secure_cookie = $secureCookie;

        // Set auth cookie, disabling the remember function
        wp_set_auth_cookie($user->ID, false, $secureCookie);

        // Forward login call
        do_action('wp_login', $user->user_login, $user);

        // Redirect
        $adminUrl = admin_url();
        header("Location: {$adminUrl}");
        http_response_code(302);
    }

    /**
     * Removes the "Forgot your password" link.
     *
     * @return void
     */
    public function removeResetPasswordLink() : void
    {
        $script = <<<HTML
<script>
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href=%s]').forEach(function (node) {
        node.parentNode.removeChild(node)
    })
})
</script>
HTML;
        printf($script, esc_url(wp_lostpassword_url()));
    }
}
