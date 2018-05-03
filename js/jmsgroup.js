// //load
$(document).ready(function()
{
    setTable();
	validate_add_msgroup();
});

function OtomatisKapital(a) {
    setTimeout(function () {
        a.value = a.value.toUpperCase();
    }, 1);
}

function setTable(){
	$('#tb_list').DataTable({
		processing: true,
		serverSide: true,
		bFilter: false,
		ajax: {
			'url': base_url + "msgroup/load_grid",
			'type': 'GET',
			'data': function (d) {
				d.param = $('#hid_param').val();
			}
		},
    } );
}

function Modalcari(){
	clearformcari();
	$('#Modal_cari').modal('show');
}

function SearchAction(){
    // var id_msgroup 	    = $('#s_kodemsgroup').val();
	var group_id 		= $('#s_group_id').val();
	var param 			= { 'group_id': group_id};
		param 			= JSON.stringify(param);

	$('#hid_param').val(param);

	var table = $('#tb_list').DataTable();
	table.ajax.reload( null, false );
	table.draw();

	$('#Modal_cari').modal('toggle');
}

var validate_add_msgroup = function () {

	var form = $('#add_msgroup');
	var error2 = $('.alert-danger', form);
	var success2 = $('.alert-success', form);

	form.validate({
		errorElement: 'span', //default input error message container
		errorClass: 'help-block help-block-error', // default input error message class
		focusInvalid: false, // do not focus the last invalid input
		rules: {
			confirmPassword: {
				equalTo: "#password"
			}	
		},

		invalidHandler: function (event, validator) { //display error alert on form submit              
			success2.hide();
			error2.show();
			App.scrollTo(error2, -200);
		},

		errorPlacement: function (error, element) { // render error placement for each input type
			var icon = $(element).parent('.input-icon').children('i');
			icon.removeClass('fa-check').addClass("fa-warning");
			icon.attr("data-original-title", error.text()).tooltip({ 'container': 'body' });
		},

		highlight: function (element) { // hightlight error inputs
			$(element)
				.closest('.form-group').removeClass("has-success").addClass('has-error'); // set error class to the control group   
		},

		unhighlight: function (element) { // revert the change done by hightlight

		},

		success: function (label, element) {
			var icon = $(element).parent('.input-icon').children('i');
			$(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
			icon.removeClass("fa-warning").addClass("fa-check");
		},

		submitHandler: function (form) {
			success2.show();
			error2.hide();
			form[0].submit(); // submit the form
		}
	});
}

function clearvalidate_add_msgroup() {

	$("#add_msgroup div").removeClass('has-error');
	$("#add_msgroup i").removeClass('fa-warning');
	$("#add_msgroup div").removeClass('has-success');
	$("#add_msgroup i").removeClass('fa-check');

	document.getElementById("add_msgroup").reset();
}


function svmsgroup(){
	if($("#add_msgroup").valid()==true){
		$group_id = $('#group_id').val();
		$status = $('#save_button').text();
		var str_url = encodeURI(base_url + "msgroup/get_data_msgroup/" + $group_id);//cek user id sudah ada atau tidak
       $.ajax({
		type:"POST",
		url:str_url,
		dataType:"html",
		success:function(data){	
            $data = $.parseJSON(data);
                if( $data != null & $status =='SAVE'){
					bootbox.alert("<div class='callout callout-danger'><span class='glyphicon glyphicon-exclamation-sign'></span>User ID " + $group_id+" sudah ada! </div>",
                            function(result){
                                if(result==true){
                                }
                            }
                        );
                    
                }
                else{
                    var iform = $('#add_msgroup')[0];
                    var data = new FormData(iform);
                    if ($status == 'UPDATE')
                        {
                            msg="Update Data Berhasil"
                        }
                        else
                        {
                            msg="Simpan Data Berhasil"
                        }
                    $.ajax({

                        type:"POST",
                        url:base_url+"msgroup/simpan_msgroup/"+$status,
                        enctype: 'multipart/form-data',
                        // dataType:"JSON",
                        contentType: false,
                        processData: false,
                        data:data,
                        success:function(data){

                            bootbox.alert({
                                message: "<span class='glyphicon glyphicon-ok-sign'></span>&nbsp;"+msg+"!!",
                                size: 'small',
                                callback: function () {

                                    window.location = base_url+'msgroup';
                                }
                            });
                        }
                    });
                }
            }
        });
	}
}

function addmsgroup(){
	clearvalidate_add_msgroup();
	$('#spansearchmskaryawan').show();
	$("#cls_changePWD").addClass("hidden");
	$('#password').attr('disabled', false);
	$('#confirmPassword').attr('disabled', false);
    $('#save_button').text('SAVE');
	// kosong();
	$('#Modal_add_msgroup').modal('show');
}

function edit(group_id){
	clearvalidate_add_msgroup();
	var str_url = encodeURI(base_url + "msgroup/get_edit_msgroup/" + group_id);
	$('#save_button').text('UPDATE');
	$("#cls_changePWD").removeClass("hidden");
	$('#spansearchmskaryawan').hide();
	$('#password').attr('disabled',true);
	$('#confirmPassword').attr('disabled', true);
	
	$.ajax({

		type:"POST",
		url:str_url,
		dataType:"html",
		success:function(data){
			
			var data = $.parseJSON(data);
			$('#group_id').val(data['group_id']);//untuk membaca kategori saat update
			$('#nama_msgroup').val(data['nama_lengkap']);
			$('#id_group').val(data['group_id']);
			$('#group_name').val(data['group_name']);
			
			$('#Modal_add_msgroup').modal('show');
			
			
		}
	});
	
}

function hapus(group_id){
	var str_url = encodeURI(base_url + "msgroup/Delmsgroup/" + group_id);
	bootbox.confirm("Anda yakin akan menghapus " + group_id+" ?",
		function(result){
			if(result==true){
				
			$.ajax({
			type:"POST",
			url:str_url,
			dataType:"html",
			success:function(data){
					bootbox.alert({
						message: "<span class='glyphicon glyphicon-ok-sign'></span>&nbsp;Hapus Berhasil Berhasil",
						size: 'small',
						callback: function () {

							window.location = base_url+'msgroup';
						}
					});
				}
			});
			}
		}
	);
	
}

function clearformcari(){
	$('#s_group_id').val('');
}


