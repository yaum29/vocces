    $(document).ready(function () {
        var vecesScroll = 0;
        var cargar="N";
        var finJson = true;
        var finCarga = true;

        cargarJson();

        $(document).unbind(".firstCall");
        $(document).on("ajaxStart.firstCall", function () {
            $("#ajaxIco").show();
            cargar = "Y";
        });

        $(document).on("ajaxStop.firstCall", function () {
            $("#ajaxIco").hide();
            cargar = "N";
        });

        $(window).scroll(function () {
            if ($(document).height() - $(this).height() - 100 < $(this).scrollTop()) {
                if (cargar == "N") {
                    cargarJson();
                }
            }
        });

        function cargarJson() {
            const elementos = 10;               
            var finElementos = 0;
            
            $.ajax({
                type: "POST",
                url: "cargarDatos.php",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (resultado) {
                    
                    if (finJson){
                        empezarElementos = vecesScroll * elementos;
                        vecesScroll++;
                        finElementos = vecesScroll * elementos;
                        resultado = JSON.parse(resultado);
                        
                        if (finElementos > Object.keys(resultado).length ) {
                            finElementos = Object.keys(resultado).length;
                            finJson = false;
                        }
                        
                        for (empezarElementos; empezarElementos < finElementos; empezarElementos++){                            
                            $(".container").append('<h1>' + resultado[empezarElementos].title + '</h1>');
                            $(".container").append('<p>' + resultado[empezarElementos].body + '</p>');    
                        }     
                    }else if (finCarga){
                        finCarga = false;
                        $(".container").append('<p> No hay más elementos para cargar</p>');   
                    }           
                },
                error: function (req, status, error) {
                    console.log("Error, algo ha ido mal");
                }
            });
        }
    });
