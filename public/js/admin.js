// Events
$('#thumbnail li').on('click', function () {
    $('#thumbnail li').removeClass('bg-blue-400')
    $(this).addClass('bg-blue-400')
    if ($(this).data('id') == 2){
        $('#thumbnailInputFile').first().addClass('hidden')
        $('#thumbnailInputFile').first().removeAttr('required')
        $('#thumbnailInputUrl').last().attr('required', '')
        $('#thumbnailInputUrl').last().removeClass('hidden')
    } else {
        $('#thumbnailInputUrl').last().addClass('hidden')
        $('#thumbnailInputUrl').last().removeAttr('required')
        $('#thumbnailInputFile').first().attr('required', '')
        $('#thumbnailInputFile').first().removeClass('hidden')
    }
})

$('#incHead').on('click', function () {
    if ($('#headOption').children().length <= 3) {
        $('#headOption').append(`<li data-id="${$('#headOption').children().length}" class="px-3 py-2 text-center hover:bg-blue-300">Head</li>`)
        $('#headInput').append(`<input data-id="${$('#headOption').children().length}"class="hidden w-full py-1 px-2 border-2 border-blue-300 rounded-lg outline-1" type="text" placeholder="Header">`)
    }
})

$('#headOption').on('click', 'li', function () {
    $('#headOption li').removeClass('bg-blue-400')
    $('#headOption li').addClass('hover:bg-blue-300')

    $(this).addClass('bg-blue-400')
    $(this).removeClass('hover:bg-blue-300')

    $('#headInput input').addClass('hidden')

    $('#headInput').children()[$(this).data('id')].classList.remove('hidden')
})

$('#incPara').on('click', function () {
    if ($('#paraOption').children().length <= 3) {
        $('#paraOption').append(`<li data-id="${$('#paraOption').children().length}" class="px-3 py-2 text-center hover:bg-blue-300">Paragraph</li>`)
        $('#paraInput').append(`<textarea data-id="${$('#paraOption').children().length}" class="hidden w-full py-1 px-2 border-2 border-blue-300 rounded-lg outline-1" type="text" placeholder="Paragraph"></textarea>`)
    }
})

$('#paraOption').on('click', 'li', function () {
    $('#paraOption li').removeClass('bg-blue-400')
    $('#paraOption li').addClass('hover:bg-blue-300')

    $(this).addClass('bg-blue-400')
    $(this).removeClass('hover:bg-blue-300')

    $('#paraInput textarea').addClass('hidden')

    $('#paraInput').children()[$(this).data('id')].classList.remove('hidden')
})

$('#form').on('submit', async function (event) {
    event.preventDefault()
    
    const image = $("#imageInput").prop('files')[0]
    const title = $("#titleInput").val()
    if (!title.trim()) return alert('Title requireq!')

    const headers = []
    const headersInput = $("#headInput").children().filter((index, head) => head.value.trim()).map((index, head) => headers.push(head.value))
    let thumbnail = $('#thumbnailInput').children().filter((index, thum) => thum.hasAttribute('required'))[0]
    const paragraphs = []
    const paragraphsInput = $("#paraInput").children().filter((index, head) => head.value.trim()).map((index, head) => paragraphs.push(head.value))
    
    const thumbnailType = thumbnail.getAttribute('type')
    if (image.size > 10 * 1024 * 1024) return alert('Size of the image should not exceed 10MB!')
    const formfata = new FormData()
    if (thumbnailType == 'file'){
        thumbnail = thumbnail.files[0]
        if (thumbnail.size > 10 * 1024 * 1024) return alert('Size of the thumbnail should not exceed 10MB!')
        formfata.append('thumbnail', thumbnail)
    } else {
        thumbnail = thumbnail.value        
        formfata.append('thumbnailUrl', thumbnail)
    }
    const category = $('#category').val()
    console.log(category);
    formfata.append('category', category)
    formfata.append('image', image)
    formfata.append('title', title)
    formfata.append('headers', JSON.stringify(headers))
    formfata.append('paragraphs', JSON.stringify(paragraphs))
    formfata.append('type', thumbnailType)

    const token = location.href.match(/token(.)+/g)[0].split('=')[1].replace(/&/g, ' ').split(' ')[0]
    const response = await (await fetch('/post?token=' + token, {
        method: "POST",
        body: formfata
    })).json()
})