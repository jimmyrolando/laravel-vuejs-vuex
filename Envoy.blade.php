@servers(['web' => 'jimmyrolando.xyz'])

@setup
    $repo = 'git@github.com:jimmyrolando/prueba4.git';
	$release_dir = '/home/deployer/default/releases';
	$app_dir = '/home/deployer/default/current';
	$store_dir = '/home/deployer/default/storage';
	$toolsDir = '/home/deployer/default/tools';
	$env = '/home/deployer/default/.env';
	$release = date('YmdHis');
@endsetup

@macro('deploy', ['on' => 'web'])
    fetch_repo
    run_composer
    update_permissions
    update_symlinks
@endmacro

@task('fetch_repo')
    [ -d {{ $release_dir }} ] || mkdir {{ $release_dir }};
    cd {{ $release_dir }};
    git clone {{ $repo }} {{ $release }};
@endtask

@task('run_composer')
    cd {{ $release_dir }}/{{ $release }};
    composer install --prefer-dist;
@endtask

@task('update_permissions')
    cd {{ $release_dir }};
    chgrp -R www-data {{ $release }};
    chmod -R ug+rwx {{ $release }};
@endtask

@task('update_symlinks')
    ln -nfs {{ $release_dir }}/{{ $release }} {{ $app_dir }}
    chgrp -h www-data {{ $app_dir }}
    ln -nfs {{ $env }} {{ $app_dir }}/{{ ".env" }}
    rm -R {{ $app_dir }}/{{ "storage" }}
    ln -nfs {{ $store_dir }} {{ $app_dir }}/{{ "storage" }}
    ln -nfs {{ $store_dir }}/{{ "app/public" }} {{ $app_dir }}/{{ "public/storage" }}
@endtask

@task('clear_cache')
	echo 'Clearing cache'
	/usr/bin/php {{ $toolsDir }}/cachetool.phar opcache:status --fcgi=/var/run/php/php7.0-fpm.sock
	/usr/bin/php {{ $toolsDir }}/cachetool.phar opcache:reset --fcgi=/var/run/php/php7.0-fpm.sock
	/usr/bin/php {{ $app_dir }}/artisan cache:clear
@endtask