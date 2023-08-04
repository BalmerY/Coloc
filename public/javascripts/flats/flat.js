window.addEventListener('DOMContentLoaded', () => {
    bindFlat();
});

function bindFlat() {
    const elements = document.querySelectorAll('.btn-outline-danger');
    const flatContainer = document.querySelector('#flat-list-container');

    elements.forEach(e => {
        e.addEventListener('click', ($event) => {
            flatId = $event.target.getAttribute('flatid');
            axios.delete('/flats/'+flatId)
            .then(function(response){
                flatContainer.innerHTML=response.data;
                bindFlat();
            })
            .catch(function (err){console.log(err); 
            });
        })
    });
}