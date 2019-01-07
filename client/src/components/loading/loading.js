const demoColorArray = ['red', 'blue', 'green', 'yellow', 'purple', 'gray'];
const colorIndex = Math.floor(Math.random() * demoColorArray.length);

let stripesAnim;
let calcPercent;

const $progress = $('.progress-bar');
const $percent = $('.percentage');
const $stripes = $('.progress-stripes');

function preload(imgArray) {
    const increment = Math.floor(100 / imgArray.length);
    $(imgArray).each(function load() {
        $('<img>').attr('src', this).load(() => {
            $progress.animate({
                width: '+=' + increment + '%',
            }, 100);
        });
    });
    calcPercent = setInterval(() => {
        $percent.text(Math.floor(($progress.width() / $('.loader').width()) * 100) + '%');
    });
}

function stripesAnimate() {
    animating();
    stripesAnim = setInterval(animating, 2500);
}

function animating() {
    $stripes.animate({
        marginLeft: '-=30px',
    }, 2500, 'linear').append('/');
}

function setSkin(skin) {
    $('.loader').attr('class', 'loader ' + skin);
}
setSkin(demoColorArray[colorIndex]);

const demoImgArray = ['http://www.hdwallpapers.in/walls/halloween_2013-wide.jpg',
    'http://www.hdwallpapers.in/walls/2013_print_tech_lamborghini_aventador-wide.jpg',
    'http://www.hdwallpapers.in/walls/ama_dablam_himalaya_mountains-wide.jpg',
    'http://www.hdwallpapers.in/walls/arrow_tv_series-wide.jpg',
    'http://www.hdwallpapers.in/walls/anna_in_frozen-wide.jpg',
    'http://www.hdwallpapers.in/walls/frozen_elsa-wide.jpg',
    'http://www.hdwallpapers.in/walls/shraddha_kapoor-wide.jpg',
    'http://www.hdwallpapers.in/walls/sahara_force_india_f1_team-HD.jpg',
    'http://www.hdwallpapers.in/walls/lake_sunset-wide.jpg',
    'http://www.hdwallpapers.in/walls/2013_movie_cloudy_with_a_chance_of_meatballs_2-wide.jpg',
    'http://www.hdwallpapers.in/walls/bates_motel_2013_tv_series-wide.jpg',
    'http://www.hdwallpapers.in/walls/krrish_3_movie-wide.jpg',
    'http://www.hdwallpapers.in/walls/universe_door-wide.jpg',
    'http://www.hdwallpapers.in/walls/night_rider-HD.jpg',
    'http://www.hdwallpapers.in/walls/tide_and_waves-wide.jpg',
    'http://www.hdwallpapers.in/walls/2014_lamborghini_veneno_roadster-wide.jpg',
    'http://www.hdwallpapers.in/walls/peeta_katniss_the_hunger_games_catching_fire-wide.jpg',
    'http://www.hdwallpapers.in/walls/captain_america_the_winter_soldier-wide.jpg',
    'http://www.hdwallpapers.in/walls/puppeteer_ps3_game-wide.jpg',
    'http://www.hdwallpapers.in/walls/lunar_space_galaxy-HD.jpg',
    'http://www.hdwallpapers.in/walls/2013_wheelsandmore_lamborghini_aventador-wide.jpg',
    'http://www.hdwallpapers.in/walls/destiny_2014_game-wide.jpg',
    'http://www.hdwallpapers.in/colors_of_nature-wallpapers.html',
    'http://www.hdwallpapers.in/walls/sunset_at_laguna_beach-wide.jpg'];

$stripes.text('////////////////////////');

preload(demoImgArray);

stripesAnimate();

$(window).load(() => {
    $progress.animate({
        width: '100%',
    }, 100, () => {
        $percent.text('100%');
        clearInterval(calcPercent);
        clearInterval(stripesAnim);
        $('.prelouder-component').css('display', 'none');
        $('.landing').css('display', 'block');
        $('body').css('background', 'none');
    });
});
