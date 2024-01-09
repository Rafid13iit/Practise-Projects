$(document).ready(function() {
    // Project Filtering
    $('.project-filter button').click(function() {
        var filterValue = $(this).attr('data-filter');
        if (filterValue == 'all') {
            $('.project-card').show('1000');
        } else {
            $('.project-card').not('.' + filterValue).hide('3000');
            $('.project-card').filter('.' + filterValue).show('3000');
        }
    });

    // Add active class to the current button (highlight it)
    $('.project-filter button').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
});