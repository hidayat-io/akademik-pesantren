// //load
$(document).ready(function()
{
	// addSantri("TMI");
	setTable();
	setTable2();
	setTable3();
	$('.numbers-only').keypress(function(event) {
		var charCode = (event.which) ? event.which : event.keyCode;
			if ((charCode >= 48 && charCode <= 57)
				|| charCode == 46
				|| charCode == 44
				|| charCode == 8)
				return true;
		return false;
	});

	//validasi form modal add_kecakapan_khusus
	$( "#add_msconfig" ).validate({
		errorElement:"em",
			messages: {
				
				email: "Email invalid"
			},

			invalidHandler: function(element, validator){
				validator.focusInvalid();
			},

			errorPlacement: function ( error, element ) {
					// Add the `help-block` class to the error element
					error.addClass( "help-block" );

					// Add `has-feedback` class to the parent div.form-group
					// in order to add icons to inputs
					$(element).closest(".form-group").addClass( "has-feedback" );

					if ( element.prop( "type" ) === "checkbox" ) {
						error.insertAfter( element.parent( "form-control" ) );
					} else {
						error.insertAfter( element );
					}

					// Add the span element, if doesn't exists, and apply the icon classes to it.
					if ( !element.next( "span" )[ 0 ] ) {
						$( "<span class='glyphicon glyphicon-remove form-control-feedback'></span>" ).insertAfter( element );
					}
				},
				success: function ( label, element ) {
					// Add the span element, if doesn't exists, and apply the icon classes to it.
					if ( !$( element ).next( "span" )[ 0 ] ) {
						$( "<span class='glyphicon glyphicon-ok form-control-feedback'></span>" ).insertAfter( $( element ) );
					}
				},
				highlight: function ( element, errorClass, validClass ) {
					$(element).closest(".form-group").addClass( "has-error" ).removeClass( "has-success" );
					$( element ).next( "span" ).addClass( "glyphicon-remove" ).removeClass( "glyphicon-ok" );
				},
				unhighlight: function ( element, errorClass, validClass ) {
					$(element).closest(".form-group").addClass( "has-success" ).removeClass( "has-error" );
					$( element ).next( "span" ).addClass( "glyphicon-ok" ).removeClass( "glyphicon-remove" );
				}

	}); //end dari validasi form

});

//#region data akademik
	function setTable() {
		$('#tb_list').DataTable({
			"order": [[0, "desc"]],
			"processing": true,
			"serverSide": true,
			"bPaginate": false,
			"info": false,
			"searching": false,
			"bFilter": false,
			"ordering": false,
			ajax: {
				'url': base_url + "msconfig/load_grid",
				'type': 'GET',
				'data': function (d) {
					d.param = $('#hid_param').val();
				}
			},
		});
	}

	function kosong() {
		$('#nomor_statistik').val('');
		$('#id_config').val('');
		$('#NPSN').val('');
		$('#nama').val('');
		$('#jenis_lembaga').val('');
	}

	function svmsconfig() {
		if ($("#add_msconfig").valid() == true) {
			$nomor_statistik = $('#nomor_statistik').val();
			$status = $('#save_button').text();
			var str_url = encodeURI(base_url + "msconfig/get_data_msconfig/" + $nomor_statistik);
			$.ajax({
				type: "POST",
				url: str_url,
				dataType: "html",
				success: function (data) {
					$data = $.parseJSON(data);
					if ($data != null & $status == 'SAVE') {
						bootbox.alert("<div class='callout callout-danger'><span class='glyphicon glyphicon-exclamation-sign'></span>" + $nomor_statistik + " SUDAH ADA DI DATABASE! </div>",
							function (result) {
								if (result == true) {
								}
							}
						);

					}
					else {
						var iform = $('#add_msconfig')[0];
						var data = new FormData(iform);
						if ($status == 'UPDATE') {
							msg = "Update Data Berhasil"
						}
						else {
							msg = "Simpan Data Berhasil"
						}
						$.ajax({

							type: "POST",
							url: base_url + "msconfig/simpan_msconfig/" + $status,
							enctype: 'multipart/form-data',
							// dataType:"JSON",
							contentType: false,
							processData: false,
							data: data,
							success: function (data) {

								bootbox.alert({
									message: "<span class='glyphicon glyphicon-ok-sign'></span>&nbsp;" + msg + "!!",
									size: 'small',
									callback: function () {

										window.location = base_url + 'msconfig';
									}
								});
							}
						});
					}
				}
			});
		}
	}

	function OtomatisKapital(a) {
		setTimeout(function () {
			a.value = a.value.toUpperCase();
		}, 1);
	}

	function edit(id_config) {
		var str_url = encodeURI(base_url + "msconfig/get_edit_msconfig/" + id_config);
		$('#save_button').text('UPDATE');
		$('#id_msconfig').attr('readonly', true);
		$.ajax({

			type: "POST",
			url: str_url,
			dataType: "html",
			success: function (data) {

				var data = $.parseJSON(data);
				$('#nomor_statistik').val(data['nomor_statistik']);//untuk membaca kategori saat update
				$('#id_config').val(data['id_config']);//untuk membaca kategori saat update
				$('#NPSN').val(data['NPSN']);
				$('#nama').val(data['nama']);
				$('#jenis_lembaga').val(data['jenis_lembaga']);
				$('#alamat').val(data['alamat']);

				$('#Modal_add_msconfig').modal('show');


			}
		});

	}
//#endregion data akademik

//#region kurikulum
	function setTable2() {
		$('#tb_list2').DataTable({
			"order": [[0, "desc"]],
			"processing": true,
			"serverSide": true,
			"bPaginate": false,
			"info": false,
			"searching": false,
			"bFilter": false,
			"ordering": false,
			ajax: {
				'url': base_url + "msconfig/load_grid_kurikulum",
				'type': 'GET',
				'data': function (d) {
					d.param = $('#hid_param2').val();
				}
			},
		});
	}

	function edit_kurikulum(param_id) {
		var str_url = encodeURI(base_url + "msconfig/get_edit_kurikulum/" + param_id);
		$('#save_button').text('UPDATE');
		$.ajax({

			type: "POST",
			url: str_url,
			dataType: "html",
			success: function (data) {

				var data = $.parseJSON(data);
				var param_value = data['param_value'];
				var strArray = param_value.split("#");

				$('#param_id').val(data["param_id"]);
				$('#semester_aktif').val(strArray[1]);
				$('#thn_ajar').val(strArray[0]);

				$('#Modal_add_kurikulum').modal('show');


			}
		});

	}

	function svkurikulum() {
		if ($("#add_kurikulum").valid() == true) {
			$status = $('#save_button').text();
			var iform = $('#add_kurikulum')[0];
			var data = new FormData(iform);
			if ($status == 'UPDATE') {
				msg = "Update Data Tahun Ajaran & Semester Aktif Berhasil"
			}
			else {
				msg = "Simpan Data Berhasil"
			}
			$.ajax({

				type: "POST",
				url: base_url + "msconfig/simpan_kurikulum/",
				enctype: 'multipart/form-data',
				// dataType:"JSON",
				contentType: false,
				processData: false,
				data: data,
				success: function (data) {

					bootbox.alert({
						message: "<span class='glyphicon glyphicon-ok-sign'></span>&nbsp;" + msg + "!!",
						size: 'small',
						callback: function () {

							window.location = base_url + 'msconfig';
						}
					});
				}
			});
		}
	
	}


//#endregion kurikulum

//#region Limit Pengeluaran
	function setTable3() {
		$('#tb_list3').DataTable({
			"order": [[0, "desc"]],
			"processing": true,
			"serverSide": true,
			"bPaginate": false,
			"info": false,
			"searching": false,
			"bFilter": false,
			"ordering": false,
			ajax: {
				'url': base_url + "msconfig/load_grid_LimitPengeluaran",
				'type': 'GET',
				'data': function (d) {
					d.param = $('#hid_param3').val();
				}
			},
		});
	}

	function edit_LimitPengeluaran(id) {
		var str_url = encodeURI(base_url + "msconfig/get_edit_LimitPengeluaran/" + id);
		$('#save_button').text('UPDATE');
		$.ajax({

			type: "POST",
			url: str_url,
			dataType: "html",
			success: function (data) {

				var data = $.parseJSON(data);
				$('#id').val(data["id"]);
				$('#limit_lama').val(data["limit"]);
				$('#limit').val(data["limit"]);

				$('#Modal_add_LimitPengeluaran').modal('show');


			}
		});

	}

	function svLimitPengeluaran() {
		if ($("#add_LimitPengeluaran").valid() == true) {
			$status = $('#save_button_pengeluaran').text();
			var iform = $('#add_LimitPengeluaran')[0];
			var data = new FormData(iform);
			if ($status == 'UPDATE') {
				msg = "Update Limt Pengeluaran Berhasil"
			}
			else {
				msg = "Simpan Data Berhasil"
			}
			$.ajax({

				type: "POST",
				url: base_url + "msconfig/simpan_LimitPengeluaran/",
				enctype: 'multipart/form-data',
				// dataType:"JSON",
				contentType: false,
				processData: false,
				data: data,
				success: function (data) {

					bootbox.alert({
						message: "<span class='glyphicon glyphicon-ok-sign'></span>&nbsp;" + msg + "!!",
						size: 'small',
						callback: function () {

							window.location = base_url + 'msconfig';
						}
					});
				}
			});
		}

	}


//#endregion

//#region Generate Rapor
	function genRAPOR() {

					// setTimeout(function () {
			// 	// $this.button('reset');
				// $('#generate_rapor').text('GENERATED');
			// }, 2000);

		// 		$('#generate_rapor').on('click', function () {
		// 	var $this = $(this);
		// 	$this.button('loading');
		// 	setTimeout(function () {
		// 		// $this.button('reset');
		// 		$this.text('GENERATED SUCCES');
		// 	}, 2000);
		// });

		var id_thn_ajar 	= $('#id_thn_ajar_GR').val();
		var semester		= $('#semester_GR').val();
		//pernah generate??
		$('#generate_rapor').button('loading');
		var str_url = encodeURI(base_url + "msconfig/cek_generate/" + id_thn_ajar + "/" + semester);
		$.ajax({

			type: "POST",
			url: str_url,
			dataType: "html",
			success: function (data) {

				var data_cek_generate = $.parseJSON(data);
				if (data_cek_generate == ''){
					var msg ="PROSES RAPOR?"
				}else{
					var msg = "SUDAH PERNAH DI PROSES, PROSES ULANG RAPOR ?"

				}
					bootbox.confirm(""+msg+"",
						function (result) {
							if (result == true) {
								var str_url = encodeURI(base_url + "msconfig/del_rapor_data/" + id_thn_ajar + "/" + semester);
								$.ajax({
									type: "POST",
									url: str_url,
									dataType: "html",
									success: function (data) {

										//get Total Matapelajaran yang akan di generate
										var str_url = encodeURI(base_url + "msconfig/get_all_id/" + id_thn_ajar + "/" + semester);
										$.ajax({

											type: "POST",
											url: str_url,
											dataType: "html",
											success: function (data) {

												var data_get_all_id = $.parseJSON(data);
												var lengthget_all_id = data_get_all_id.length;
												//get all data nilai_hd
												for (i = 0; i < lengthget_all_id; i++) {

													var id_nilai = data_get_all_id[i].id;
													var str_url = encodeURI(base_url + "msconfig/gen_all_nilai/" + id_nilai);
													$.ajax({

														type: "POST",
														url: str_url,
														dataType: "html",
														success: function (data) {

															var data_gen_all_nilai = $.parseJSON(data);
															var id_thn_ajar = data_gen_all_nilai.id_thn_ajar;
															var semester = data_gen_all_nilai.semester;
															var kode_kelas = data_gen_all_nilai.kode_kelas;
															var id_mapel = data_gen_all_nilai.id_mapel;
															var no_registrasi = data_gen_all_nilai.no_registrasi;
															var nilai = data_gen_all_nilai.total_nilai / data_gen_all_nilai.total_record;

															var json_data = {

																"id_thn_ajar": id_thn_ajar,
																"semester": semester,
																"kode_kelas": kode_kelas,
																"id_mapel": id_mapel,
																"no_registrasi": no_registrasi,
																"nilai": nilai
															};

															//save to data rapor
															var str_url = encodeURI(base_url + "msconfig/save_nilai_rapor/");
															$.ajax({

																type: "POST",
																url: str_url,
																dataType: "json",
																// data: json_data
																data: json_data,
																complete: function (data) {
	
																			
																	


																}
															});
														},

														complete: function (data) {
															var elem = document.getElementById("myBar");
															var width = 10;
															var id = setInterval(frame, 10);
															function frame() {
																if(width >= 100) {
																clearInterval(id);
																} else {
																	width++;
																	elem.style.width = width + '%';
																	elem.innerHTML = width * 1 + '%';
																	if(width == 100) {
																		$('#generate_rapor').text('GENERATED');
																	}

																}
															}
														}	
													});

												}
												// $('#generate_rapor').text('GENERATED');

											}
										});
									}
								});
							}else{
								$('#generate_rapor').button('reset');
								$('#generate_rapor').button('Generate Rapor');
							}
						}
					);
			}
		});

		
	}
//#endregion Generate Rapor