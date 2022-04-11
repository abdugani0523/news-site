$('#navbar li').on('click', function () {
    const barId = $(this).data('id')
    $('#cards li').filter(function () {
        $(this).toggle($(this).data('category') == barId)
    })
    $('#content').addClass('hidden')
    $('#cards').removeClass('hidden')
})

$('#cards li').on('click', function () {
    const cardId = $(this).data('id')
    $(`.post`).filter(function () {
        $(this).toggle($(this).data('id') == cardId).removeClass('hidden')
    })
    $(`#content`).removeClass('hidden')
    $('#cards').addClass('hidden')
})

$("#backBtn").on('click', function () {
    $('#content').addClass('hidden')
    $('#cards').removeClass('hidden')
})

$('#navbar li').first().click()