$(function(){	
	var itemSelected;
	var body = $('body');
	var bodyscroll='noScroll';
	var iter= $('.item');
	var itemContent = iter.find('.item_content');
	var itemClose;
	var itemFigure;
	var itemImage;
	$(window).on('scroll',recalc);
	$(window).on('resize',recalc);
	recalc();
	function recalc(){
		$('.item').each(function(){
			var iter1=$(this);
			var itemContent1 = $(this).find('.item_content');
			itemContent1.css('width',iter1.width());
		itemContent1.css('height',iter1.height());
		offset=iter1.position();
		var x= offset.top - $(document).scrollTop()
		itemContent1.css({
			'left' : offset.left ,
			'top' : x
		});	
		});
	}
	_init();			

	//Inicializa evento click item
	function _init() {

		console.log("Inicio");			
		itemContent.find('p').hide();
		itemContent.find('svg').hide();

		$('.item').one('click',function(e){
			$(this).off('click');
			//Elementos que más se repiten.

			itemSelected = $(this);	
			itemContent = itemSelected.find('.item_content');		
			itemFigure = itemSelected.find('figure');
			itemImage = itemFigure.children('img');
			itemPara = itemSelected.find('p');
			itemClose = itemSelected.find('svg');
		/*COMPROBAR QUE EN LA SEGUNDA LLAMADA SE ACTUALIZAN LOS VALORES*/
		

		/*BLOQUE DE PRUEBA*/
			
			//setTopLeft();	
			//itemSelected.find('.item_content').attr("class",'item_content item_overlay visible');	
				itemFigure.hide();				
				open();			

			
				


			
		});
	}
	//Abre ventana
	function open(){	
			
		//
		bodyscroll='noScroll';
		//EVENTO DE FINAL DE TRANSICION
			console.log("Programado evento final de transición");
		
			
			console.log("Scroll de content activado");

			
			console.log("Body no scroll");			
				//Cambiar clase de la imagen para que se vea en el centro
			itemContent.one('transitionend', function(e){	
				//alert('tEnd Open');
				//Desactivar item click event
				itemContent.attr("class", 'item_content item_overlay  scroll');
				//MOSTRAR ELEMENTOS PROVISIONALMENTE
				toggleScrollBody();	

				itemImage.attr("class","item_image_centered");
					itemFigure.fadeIn("fast");
					itemClose.fadeIn("fast");
					itemPara.fadeIn("fast");
				//Configurar evento de cierre
				console.log("Posicionamiento de los objetos del content");
				//alert('OFF tEnd Open');
				e.stopPropagation();
			itemContent.off('transitionend');

		});

		console.log("Item open e Item active");
		console.log("Programado onclick close, cuando se pulse llamará a close");
		itemClose.one('click',function(e){			
			e.stopPropagation(); //Evita que falle el toggle y se extienda el evento a los padres
			$(this).off('click');
			close();
		});
		itemSelected.attr("class", "item item--active item--open");


	}	

		//Cierra ventana
		function close(){	

			//alert('Close');
			console.log("Close");	
			console.log("Cierra content");
			
			itemFigure.hide();
			itemImage.attr("class","item_image no-transition");
			itemContent.attr("class",'item_content item_overlay fixed visible');			
			setTimeout(function(){					
				itemImage.attr("class","item_image");			
			},10);
			
			//itemImage.attr("class","item_image");
		
			
			console.log("Cambia a item_image");
			//Reset body scroll	
			bodyscroll="";
			toggleScrollBody();	
			console.log("Body scroll");					

			itemContent.one('transitionend', function(e){
				itemFigure.fadeIn('fast');				
				itemContent.attr("class", 'item_content item_overlay');		

				//Desatender evento de transición.
				e.stopPropagation();
				itemContent.off('transitionend');
			});
			
			itemSelected.attr("class","item");
			console.log("Quita Scroll de content y termina");
				//alert("End Close");
			_init();
		}		
	

	
	//Cambia la propiedad de una clase al final de una transicion.
	function transEnd(ev){
		//alert('tEnd Close');
		

	}
	//Toggle scroll and noScroll classes
	function toggleScrollBody(){		
			body.attr("class",bodyscroll);
	}

	function cssBounding(){
			itemContent.css('width',itemSelected.width());
			itemContent.css('height',itemSelected.height());
			offset=itemSelected.position();
			var x= offset.top - $(document).scrollTop()
			itemContent.css({
				'left' : offset.left ,
				'top' : x
			});	

	}	
});


$(function() {
	var wrapper = $('.wrapper');
	var trigger = wrapper.find('button.trigger');
	$(window).on( 'scroll', keepInTop );
	//Al pulsar trigger si wrapper--open -> wrapper
	//si no wrapper--open
	trigger.click(function(){
		if(wrapper.attr("class") == 'wrapper--open'){
			wrapper.removeAttr("class");
			wrapper.attr("class","wrapper");	
			$(this).attr("class","trigger");
			$(window).on( 'scroll', keepInTop );			
		}else{
			$('.wrapper').attr("class","wrapper--open");
			$(this).attr("class","trigger--active");
			$(window).off('scroll',keepInTop);
		}		
	});
	//Mantiene la barra de scroll en (0,0)
	function keepInTop() {
		window.scrollTo( 0, 0 );
	}

});