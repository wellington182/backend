(function(win, doc) {
    'use strict';

    var $name = doc.querySelector( '[data-js="name"]' );
    var $cpf = doc.querySelector( '[data-js="cpf"]' );
    var $phone = doc.querySelector( '[data-js="phone"]' );
    var $outErr = doc.querySelector( '[data-js="outErr"]' );

    function insert( e ) {
        var name = $name.value;
        var cpf = $cpf.value;
        var phone = $phone.value;
        var err = [];

        $outErr.innerHTML = '';
    
        if ( name === '' ) {
            err.push('<p>Nome é obrigatório</p>');
        }
    
        if ( cpf === '' ) {
            err.push('<p>CPF é obrigatório</p>');
        }
    
        if( phone === '' ) {
            err.push( '<p>Telefone é obrigatório</p>');
        }
    
        if ( err.length > 0 ) {
            e.preventDefault();       
            $outErr.innerHTML = err.join('');
        }
    }


    var form = doc.querySelector('[data-js="form"]' );
    form.addEventListener( 'submit', insert, false );
})(window, document);