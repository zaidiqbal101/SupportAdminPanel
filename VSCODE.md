# VS Code Setup Guide

This repository includes VS Code workspace configuration to enhance your development experience.

## Getting Started

1. **Open the project in VS Code**
   ```bash
   code .
   ```

2. **Install Recommended Extensions**
   - When you open the project, VS Code will prompt you to install recommended extensions
   - Click "Install All" to get all the recommended extensions
   - Or view recommended extensions: `Ctrl+Shift+P` → "Show Recommended Extensions"

## Included Configuration Files

### `.vscode/settings.json`
Workspace settings that configure:
- **PHP formatting**: Uses Laravel Pint for code formatting
- **JavaScript/React formatting**: Uses Prettier for consistent code style
- **Tailwind CSS IntelliSense**: Enhanced autocomplete for Tailwind classes
- **File associations**: Proper handling of Blade templates and other Laravel files
- **Search exclusions**: Excludes vendor, node_modules from search for better performance

### `.vscode/extensions.json`
Recommended extensions for Laravel + React development:
- **PHP Development**: Intelephense, Laravel Pint, Laravel Blade, Blade Formatter
- **JavaScript/React**: ESLint, Prettier, React snippets
- **Tailwind CSS**: IntelliSense for Tailwind classes
- **Utilities**: EditorConfig, DotEnv, Auto Rename Tag, Path IntelliSense
- **Testing**: PHPUnit integration
- **Git**: GitLens for enhanced Git capabilities

### `.vscode/launch.json`
Debug configurations for PHP:
- **Listen for Xdebug**: Debug Laravel applications with Xdebug
- **Launch current script**: Debug individual PHP files
- **Built-in web server**: Start PHP server with debugging enabled

### `.vscode/tasks.json`
Quick tasks accessible via `Ctrl+Shift+B` (or `Cmd+Shift+B` on Mac):
- **Serve Laravel**: Start the Laravel development server
- **Run Vite Dev Server**: Start Vite for frontend asset compilation
- **Build Assets**: Compile production assets
- **Run All Services (Dev)**: Runs `composer dev` script (starts Laravel server, queue listener, and Vite)
- **Run PHPUnit Tests**: Execute tests via `php artisan test`
- **Run Pest Tests**: Execute tests via `vendor/bin/pest`
- **Laravel Pint (Fix)**: Auto-fix code style issues
- **Laravel Pint (Test)**: Check code style without making changes
- **Clear Cache**: Clear all Laravel caches
- **Install Dependencies**: Install both Composer and NPM dependencies
- **Run Migrations**: Execute database migrations
- **Fresh Migrate with Seed**: Reset database and run seeders

## Using Tasks

1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Tasks: Run Task"
3. Select the task you want to run

Or use the keyboard shortcut:
- `Ctrl+Shift+B` (or `Cmd+Shift+B` on Mac) to run the default build task

## Debugging PHP with Xdebug

1. Install Xdebug in your PHP environment
2. Configure Xdebug to use port 9003 (default in config)
3. Set breakpoints in your PHP code
4. Press `F5` or go to Run → Start Debugging
5. Select "Listen for Xdebug" configuration

## Customizing

You can customize these settings by:
- Editing files in `.vscode/` directory for workspace settings (affects all developers)
- Using User Settings for personal preferences (affects only you)

## Tips

- **Quick File Navigation**: `Ctrl+P` (or `Cmd+P`) to quickly open files
- **Command Palette**: `Ctrl+Shift+P` (or `Cmd+Shift+P`) for all commands
- **Terminal**: Press `Ctrl` and backtick key together (or `Cmd` and backtick) to open integrated terminal
- **Multi-cursor**: `Alt+Click` to place multiple cursors
- **Format Document**: `Shift+Alt+F` to format the current file

## Troubleshooting

**Extensions not installing?**
- Manually install from Extensions marketplace
- Search for extension IDs listed in `.vscode/extensions.json`

**Formatting not working?**
- Ensure Laravel Pint is installed: `composer require laravel/pint --dev`
- For JavaScript, ensure Prettier extension is installed

**Debugging not working?**
- Verify Xdebug is installed: `php -m | grep xdebug`
- Check Xdebug configuration in `php.ini`
- Ensure Xdebug is configured for port 9003

## Additional Resources

- [VS Code Documentation](https://code.visualstudio.com/docs)
- [Laravel Documentation](https://laravel.com/docs)
- [Xdebug Configuration Guide](https://xdebug.org/docs/install)
