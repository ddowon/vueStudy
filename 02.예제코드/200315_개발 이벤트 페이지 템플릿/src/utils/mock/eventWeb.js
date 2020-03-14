var eventObj = eventObj || {};

eventObj.val = {
	common: {
		isNxLogin: function () {
			if (eventObj.val.common.strPageChannelType === "NAVER") {
				return gdp.jslib.checkLogin();
			}
			else {
				return NXMember.IsLogin();
			}
		}
		, isMobile: "False"
		, isLoading: 0
		, listAjaxUrl: "commentlist.aspx"
		, strQtDate: ""
		, strQtTime: ""
		, strPageChannelType: ""
		, isRequireReload: false
	}
	, eventPage: {
		n1RequestType: 0
		, n1ItemType: 0
		, n4EventSeq: 0
		, strDate: ""
	}
	, msgBox: {
		open: function (isReload) {
			if (isReload == 1) {
				$(".btnMessageBoxClose").attr("data-isReload", 1);
			}

			if ($("#systemMessage").length > 0) {
				$("#systemMessage").html(eventObj.val.msgBox.strMsg);
				$(".overlay").show();
				$("#popAlert").show();
			} else {
				alert(eventObj.val.msgBox.strMsg);
			}
		}
		, strMsg: ""
	}
};

eventObj.helperFn = {
	// Transform (Pc <-> Mobile)
	transformPageType: function () {
		var isMobile = false;
		var url = location.href;

		var iphone = /iphone/;
		var android = /android/;
		var opera = /opera/;
		var bada = /bada/;

		// DeviceCheck
		var ua = window.navigator.userAgent.toLowerCase();
		if (iphone.test(ua) || android.test(ua) || opera.test(ua) || bada.test(ua)) {
			isMobile = true;
		} else {
			isMobile = false;
		}

		// Page Transform
		if (isMobile === true) {
			if (eventObj.helperFn.urlParamsInfo.getVar('isPcVersion') === undefined) {
				if (url.toLowerCase().indexOf("update.aspx") > -1) {
					url = url.toLowerCase().replace("update.aspx", "update_m.aspx");
					location.href = url;
				}
			}
		}
		else {
			// Pc
			if (url.toLowerCase().indexOf('update_m.aspx') > -1) {
				url = url.toLowerCase().replace("update_m.aspx", "update.aspx");
				location.href = url;
			}
		}
	}
	// ErrorHandler
	, checkAjaxError: function (data) {
		var obj = $.parseJSON(data);

		if (obj.errorMessage === undefined) {
			return true;
		}
		else if (obj.errorMessage != "") {
			alert(obj.errorMessage);
			return false;
		}
		else {
			return true;
		}
	}
	// 로그인체크
	, isLoginCheck: function () {
		// if (eventObj.val.common.isNxLogin()) {
		// 	return true;
		// }
		// else {
		// 	if (eventObj.val.common.isMobile == "False") {
		// 		if (eventObj.val.common.strPageChannelType === "NAVER") {
		// 			gdp.jslib.goLogin();
		// 		}
		// 		else {
		// 			//PS.nxlogin.showLoginLayer();
		// 			NXMember.GoLogin({ "redirect": location.href });
		// 		}
		// 	}
		// 	else {
		// 		if (eventObj.val.common.strPageChannelType === "NAVER") {
		// 			gdp.jslib.goLogin();
		// 		}
		// 		else {
		// 			//location.href = "http://nxlogin.nexon.com/common/login.aspx?sec=login&redirect=" + location.href;
		// 			location.href = "http://nxlogin.nexon.com/common/mlogin.aspx?sec=login&redirect=" + location.href;
		// 		}
		// 	}

		// 	return false;
		// }
	}
};

eventObj.fn = {
	// 캐릭터리스트
	characterList: function (reqCharClass) {
		// 초기화
		$("#selCharacterList option").remove();

		$.ajax({
			url: "/ajax/Character.aspx",
			data: ({ MethodType: "Get", rd: Math.random() }),
			success: function (data) {
				if (!eventObj.helperFn.checkAjaxError(data)) {
					return false;
				}

				var objResult = $.parseJSON(data);

				if (objResult.ResultCode >= 0) {
					// 캐릭터 없음
					if (objResult.ResultCode == 0) {
						$("#selCharacterList").append("<option value=\"-2\">캐릭터 생성 후 참여 가능합니다!</option>");
					} else {
						// 캐릭터리스트 Append
						var arrInfo = objResult = $.parseJSON(objResult.ResultData);

						$("#selCharacterList").append("<option value=\"-1\" selected>캐릭터를 선택해 주세요.</option>");

						$.each(arrInfo, function (idx, val) {
							if (reqCharClass > 0) {
								// 특정 캐릭터만 리스트업
								if (Number(val.charClass) === Number(reqCharClass)) {
									$('#selCharacterList').append('<option value=\'' + val.charUID + '\' data-charlev=\'' + val.charLevel + '\'>Lv.' + val.charLevel + ' ' + val.charNickName + '</option>');
								}
							}
							else {
								// TeamName
								var strTeamName = '검은양팀';
								var teamClassName = 'option_black';

								if (Number(val.charClass) >= 100011 && Number(val.charClass) <= 100015) {
									strTeamName = '늑대개팀';
									teamClassName = 'option_dog';
								}

								if (Number(val.charClass) >= 100021) {
									strTeamName = '사냥터지기팀';
									teamClassName = 'option_owl';
								}

								if (Number(val.charClass) >= 100031) {
									strTeamName = '시궁쥐팀';
									teamClassName = 'option_rattus';
								}

								$('#selCharacterList').append('<option value=\'' + val.charUID + '\' data-charlev=\'' + val.charLevel + '\' class=\'' + teamClassName + '\'>[' + strTeamName + '] Lv.' + val.charLevel + '  ' + val.charNickName + '</option>');
							}
						});
					}
				}
				else if (Number(objResult.ResultCode) === -98) {
					alert("이용약관 및 정보제공 동의가 필요한 서비스 입니다.");
					return false;
				}
				else {
					alert("캐릭터 정보 조회가 지연되고 있습니다.\n잠시 후 다시 시도해 주세요.");
					return false;
				}

				// 커스텀셀렉트 관련 Init          
				eventObj.fn.custSelect();
			},
			error: function (xhr, status, exception) {
				alert("에러가 발생하였습니다." + xhr.responseText);
			}
		});
	}
	// 캐릭터리스트 (리스트형태)
	, characterList_v2: function () {
		// 초기화
		$("#ulCharList").children().remove();

		$.ajax({
			url: "/ajax/Character.aspx",
			data: ({ MethodType: "Get", rd: Math.random() }),
			success: function (data) {
				if (!eventObj.helperFn.checkAjaxError(data))
					return false;

				var objResult = $.parseJSON(data);

				if (objResult.ResultCode >= 0) {
					// 캐릭터 없음
					if (objResult.ResultCode == 0) {
						$("#ulCharList").append("<li class=\"noList\"><p>생성된 캐릭터가 없습니다.</p></li>");
					} else {
						// 캐릭터리스트 Append
						var arrInfo = objResult = $.parseJSON(objResult.ResultData);

						$.each(arrInfo, function (idx, val) {
							if (Number(val.charClass) === 100002) {
								$("#ulCharList").append("<li><div class=\"char\"><img src=\"http://s.nx.com/s2/game/closers/2015/avatar/board" + val.charClass + "" + val.charClassUpgradeLevel + ".gif\" alt=\"캐릭터\" width=\"53\" height=\"53\"></div><p class=\"nick\"><span>Lv" + val.charLevel + ". </span>" + val.charNickName + "</p><p class=\"btn choice\"><button type=\"button\" onclick=\"eventObj.fn.getItem(\"" + val.charUID + "\", \"" + val.charNickName + "\", \"" + val.charLevel + "\");\"><img src=\"http://s.nx.com/s2/game/closers/2016/events/160630_teaser4/btn_selected.png\" alt=\"\"></button></p></li>");
							}
						});

						// 슬비캐릭터가 없는 경우
						if ($("#ulCharList").children().length <= 0) {
							$("#ulCharList").append("<li class=\"noList\"><p>생성된 슬비 캐릭터가 없습니다.</p></li>");
						}
					}
				} else {
					alert("캐릭터 정보 조회가 지연되고 있습니다.\n잠시 후 다시 시도해 주세요.");
					return false;
				}

				// 커스텀셀렉트 관련 UI스크립트 호출
				evObj.custSelect();
			},
			error: function (xhr, status, exception) {
				alert("에러가 발생하였습니다." + xhr.responseText);
			}
		});
	}
	// 캐릭터선택
	, custSelect: function () {
		$('.customSelect .txt').each(function () {
			$(this).text($(this).next('select').children('option:selected').text());
		});
		$('.customSelect select').change(function () {
			$(this).prev('.txt').text($(this).children('option:selected').text());
		});
		$('.customSelect select').focusin(function () {
			$(this).parents('.customSelect').addClass('customSelectF');
		});
		$('.customSelect select').focusout(function () {
			$(this).parents('.customSelect').removeClass('customSelectF');
		});
	}
	// 캐릭터리스트 SelectBox초기화
	, custSelectClose: function () {
		$('#choiceChar .customSelect select').val(-1);
		$('#choiceChar .customSelect select option').eq(0).attr('selected', 'selected');
		$('#choiceChar .customSelect .txt').text($('#choiceChar .customSelect .txt').next('select').children('option').eq(0).text());
	}
	// 넥슨공통 댓글리스트
	, nx_reloadComment: function (n4ArticleSN, n4CommentPageNo) {
		$(".commentList").remove();
		$("#commentPaging").remove();
		$("#currentInfo").remove();
		$(".listLength").remove();

		$.ajax({
			url: eventObj.val.common.listAjaxUrl + "?n4ArticleSN=" + n4ArticleSN + "&n4CommentPageNo=" + n4CommentPageNo + "&rd=" + Math.random()
			, success: function (data, textStatus, xhr) {
				$(data).appendTo("#commentArea");       // 댓글 리스트 삽입
				eventObj.val.common.isLoading = Number(0);    // 처리중 UnLock
			}
			, beforeSend: function () {
				eventObj.val.common.isLoading = Number(1);    // 처리중 Lock
			}
			, complete: function () {
				eventObj.val.common.isLoading = Number(0);    // 처리중 UnLock
			}
			, error: function (xhr, status, exception) {
				alert("에러가 발생하였습니다.");
				eventObj.val.common.isLoading = Number(0);    // 처리중 UnLock
			}
		});
	}
	// 넥슨공통 댓글입력
	, nx_addComment: function (n4ArticleSN, strTextboxId) {
		// 댓글 처리중 체크
		if (eventObj.val.common.isLoading == 1) {
			alert("처리중입니다.");
			return false;
		}
		// 처리중 변경
		eventObj.val.common.isLoading = Number(1);

		// 댓글 내용
		var textBoxObj = $('#' + strTextboxId);
		var strComment = $.trim($(textBoxObj).val());

		if (!strComment) {
			alert("내용을 입력해주세요.");
			$(textBoxObj).focus();

			// 처리가능 변경
			eventObj.val.common.isLoading = Number(0);
		}
		else {
			$.ajax({
				url: "ajax.aspx"
				, type: "POST"
				, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
				, data: ({ MethodType: "AddComment", n4ArticleSN: n4ArticleSN, strComment: strComment, rd: Math.random() })
				, success: function (data) {
					// 처리가능 변경
					eventObj.val.common.isLoading = Number(0);

					if (!eventObj.helperFn.checkAjaxError(data))
						return false;

					var objResult = $.parseJSON(data);

					$(textBoxObj).val("");

					if (objResult.errorCode == "WriteStatus_ATL10")
						NgbMember.BoardVerification();
					if (objResult.redirectUrl != "")
						document.location.href = objResult.redirectUrl;
					else if (objResult.errorMessage != "")
						alert(objResult.errorMessage.replace("<br>", "\n"));
					else {
						eventObj.fn.nx_reloadComment(objResult.n4ArticleSN, 1)
					}
				}
				, error: function (xhr, status, exception) {
					alert("에러가 발생하였습니다.");

					// 처리가능 변경
					eventObj.val.common.isLoading = Number(0);
				}
			});
		}
	}
	// 넥슨공통 댓글삭제
	, nx_delComment: function (n4ArticleSN, n4CommentSN) {
		// 댓글 처리중 체크
		if (eventObj.val.common.isLoading == 1) {
			alert("처리중입니다.");
			return false;
		}
		// 처리중 변경
		eventObj.val.common.isLoading = Number(1);

		$.ajax({
			url: "ajax.aspx"
			, data: ({ MethodType: "RemoveComment", n4ArticleSN: n4ArticleSN, n4CommentSN: n4CommentSN, rd: Math.random() })
			, success: function (data) {
				if (!eventObj.helperFn.checkAjaxError(data))
					return false;

				var objResult = $.parseJSON(data);

				if (objResult.redirectUrl != "")
					document.location.href = objResult.redirectUrl;
				else if (objResult.errorMessage != "")
					alert(objResult.errorMessage);
				else
					eventObj.fn.nx_reloadComment(objResult.n4ArticleSN, 1);

				// 처리가능 변경
				eventObj.val.common.isLoading = Number(0);

				alert("삭제되었습니다.");
			}
			, error: function (xhr, status, exception) {
				alert("에러가 발생하였습니다.");

				// 처리가능 변경
				eventObj.val.common.isLoading = Number(0);
			}
		});
	}
};

eventObj.bindEvents = {
	// 이벤트페이지 공통 BindEvents
	common: function (isMobile, eventTitle, eventUrl, gameStartLogId, gameStartLogName, date, time, pageChannelType) {
		// 모바일 체크
		eventObj.val.common.isMobile = isMobile;

		// 게임스타트 버튼 넥슨로그 저장 관련 태그 Append
		var gameStartLogHtml = "<input type=\"hidden\" id=\"gamestartLogID\" value=\"" + gameStartLogId + "\" /><input type=\"hidden\" id=\"gamestartLog\" value=\"" + gameStartLogName + "\" />";
		$(".etcArea").append(gameStartLogHtml);

		// TimeSet
		eventObj.val.common.strQtDate = date;
		eventObj.val.common.strQtTime = time;

		// PageChannelType
		eventObj.val.common.strPageChannelType = pageChannelType;

		// Location Reload
		$(document).on("click", ".btnLocationReload", function () {
			location.reload();
		});

		// CloseCharLayer
		$(document).on("click", ".btnCloseCharLayer", function () {
			$("#choiceChar").hide();
			$(".overlay").hide();
		});

		// 오늘하루 영상 안보기
		$(document).on("click", ".btnDailyCloseMovie", function () {
			var name = $(this).attr('data-cookiename');
			eventObj.helperFn.na_setCookie(name, "done", 1);
			evObj.showVideoStop();
		});

		// 아이템 지급 리스트보기
		$(document).on("click", ".btnOpenItemList", function () {
			var isPayments = Number($(this).attr("data-ispayments"));
			var errMsg = $(this).attr("data-msg");

			if (eventObj.helperFn.isLoginCheck()) {
				if (Number(isPayments) < 0) {
					eventObj.val.msgBox.strMsg = errMsg;
					eventObj.val.msgBox.open(0);
				}
				if (Number(isPayments) === 0) {
					if (eventObj.val.common.isRequireReload) {
						eventObj.val.msgBox.strMsg = '지급받은 아이템 리스트갱신을 위해 새로고침 됩니다.';
						eventObj.val.msgBox.open(1);
					}
					else {
						$(".overlay").show();
						$(".winList").show();
					}
				}
			}
		});

		// 아이템 지급 리스트닫기
		$(document).on("click", ".btnCloseItemList", function () {
			$(".overlay").hide();
			$(".winList").hide();
		});

		// 아이템 지급 완료 닫기
		$(document).on("click", ".btnCloseItemClear", function () {
			$(".overlay").hide();
			$("#itemClear").hide();
		});

		// 공통 메시지팝업 닫기
		$(document).on("click", ".btnMessageBoxClose", function () {
			if ($(this).attr("data-isReload") == 0) {
				$(".overlay").hide();
				$("#popAlert").hide();
			} else if ($(this).attr("data-isReload") == 2) {
				$(".overlay").hide();
				$("#popAlert").hide();

				// 신청완료레이어 페이지 호출 및 완료
				eventObj.fn.event_2019_12_05.promotion.popCompleteLayer();
			} else {
				location.reload();
			}
		});
	}
	// 넥슨공통 댓글 이벤트 바인딩
	, nx_commonCommentEvents: function (n4ArticleSN, textBoxId, listAjaxUrl) {
		// listUrlSet
		eventObj.val.common.listAjaxUrl = listAjaxUrl;

		// 댓글리스트 가져오기
		eventObj.fn.nx_reloadComment(n4ArticleSN, 1);

		// 댓글입력 버튼
		$(document).on("click", "#btnAddComment", function (e) {
			var isWriterable = $("#currentInfo").attr("data-IsWriterable");
			var strNotWriterableMessage = $("#currentInfo").attr("data-strNotWriterableMessage");
			var isMobile = $("#currentInfo").attr("data-ismobile");

			// 로그인체크
			if (eventObj.helperFn.isLoginCheck(isMobile)) {
				if (isWriterable == "False") {
					alert(strNotWriterableMessage);
					return false;
				}
				else {
					eventObj.fn.nx_addComment(n4ArticleSN, textBoxId);
					return false;
				}
			}
		});

		// 페이징 버튼
		$(document).on("click", "#commentPaging a", function (e) {
			var url = $(this).attr("href");

			if (typeof (url) !== "undefined") {
				var abc = url.match(/n4PageNo=[\d]+/i);
				var n4PageNo = abc[0].substr(abc[0].indexOf("=") + 1, 100);

				eventObj.fn.nx_reloadComment(n4ArticleSN, n4PageNo);
			}

			return false;
		});

		// 댓글삭제 버튼
		$(document).on("click", "#btnDel", function (e) {
			var n4CommentSN = $(this).attr("data-n4commentsn");

			if (confirm("정말로 삭제하시겠습니까?")) {
				eventObj.fn.nx_delComment(n4ArticleSN, n4CommentSN);
			}

			return false;
		});
	}
	// Textbox Observer 이벤트 바인딩
	, textboxObserverEvents: function (txtId, limitlength, isCounting, countId) {
		var textBoxObj = $('#' + txtId);

		// 옵저버(0.01초 마다 textBox변화 감지)
		var tmpStr = null;
		var observer = function ($this) {
			time = setInterval(function () {
				var str = $this.val();
				var strByte = eventObj.helperFn.byteCheck(str);

				// 글자수 실시간 체크 및 뷰
				if (isCounting === true) {
					var countObj = $('#' + countId);
					$(countObj).text(str.length + " / " + limitlength);
				}

				if (!str) {
					tmpStr = null;
					return false;
				}
				else if (!tmpStr) {
					tmpStr = str;
					if (strByte > limitlength) {
						alert("코멘트는 " + limitlength + "byte 이상 입력 하실 수 없습니다.");
						$this.val(eventObj.helperFn.byteCut(str, limitlength));
					}
				}
				else if (tmpStr != str) {
					tmpStr = str;
					if (strByte > limitlength) {
						alert("코멘트는 " + limitlength + "byte 이상 입력 하실 수 없습니다.");
						$this.val(eventObj.helperFn.byteCut(str, limitlength));
					}
				}
			}, 10);
		};

		// 옵저버 실행
		$(document).on("focus", textBoxObj, function () {
			observer($(this));
		});

		// 옵저버 종료
		$(document).on("blur", textBoxObj, function () {
			clearInterval(time);
			tmpStr = null;
		});
	}
	// Update
	, Update: function (reqCharClass) {
		// 캐릭터리스트
		if (eventObj.val.common.isNxLogin()) {
			// reqCharClass (0: 전체캐릭터, 1: 클래스별)
			eventObj.fn.characterList(reqCharClass);
		}

		// 아이템 지급 체크
		$(document).on("click", ".btnGetItem", function () {
			// 지급정보저장
			eventObj.val.eventPage.n1RequestType = $(this).attr("data-n1requesttype");
			eventObj.val.eventPage.n4EventSeq = $(this).attr("data-n4eventseq");
			var isPayments = Number($(this).attr("data-ispayments"));
			var errMsg = $(this).attr("data-msg");

			if (eventObj.helperFn.isLoginCheck()) {
				if (Number(isPayments) < 0) {
					eventObj.val.msgBox.strMsg = errMsg;
					eventObj.val.msgBox.open(0);
				}

				if (Number(isPayments) === 0) {
					// 캐릭터 선택 레이어 오픈
					$(".overlay").show();
					$("#choiceChar").show();
				}
			}
		});

		// 아이템 지급
		$(document).on("click", ".btnItemPayments", function () {
			// 처리중 체크
			if (eventObj.val.common.isLoading === 1) {
				eventObj.val.msgBox.strMsg = "처리중입니다.";
				eventObj.val.msgBox.open(0);
				return false;
			}
			eventObj.val.common.isLoading = Number(1);                // 처리중 Lock

			// 캐릭터체크
			var charId = Number($("#selCharacterList option:selected").val());
			var charName = $("#selCharacterList option:selected").text();

			if (charId === -1) {
				eventObj.val.msgBox.strMsg = "캐릭터를 선택해 주세요.";
				eventObj.val.msgBox.open(0);
				eventObj.val.common.isLoading = Number(0);    // 처리중 UnLock
				return false;
			}
			else if (charId === -2) {
				eventObj.val.msgBox.strMsg = "게임에 접속하여 캐릭터 생성 후 참여 가능합니다!";
				eventObj.val.msgBox.open(0);
				eventObj.val.common.isLoading = Number(0);    // 처리중 UnLock
				return false;
			}

			if (eventObj.helperFn.isLoginCheck()) {
				// Process
				$.ajax({
					url: "Update_ajax.aspx"
					, type: "POST"
					, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
					, data: ({
						  n1RequestType: eventObj.val.eventPage.n1RequestType
						, n4EventSeq: eventObj.val.eventPage.n4EventSeq
						, strQtDate: eventObj.val.common.strQtDate
						, strQtTime: eventObj.val.common.strQtTime
						, n8GameCharacterId: charId
						, strCharacterName: charName
					})
					, cache: false
					, success: function (data) {
						eventObj.val.common.isLoading = Number(0);    // 처리중 UnLock

						var obj = $.parseJSON(data);

						switch (Number(obj.errorCode)) {
							case 0:
								$("#choiceChar").hide();
								$(".overlay").show();
								$("#itemClear").show();
								break;
							default:
								eventObj.val.msgBox.strMsg = obj.errorMessage;
								eventObj.val.msgBox.open(0);
								break;
						}
					}
					, beforeSend: function () {
						eventObj.val.common.isLoading = Number(1);    // 처리중 Lock
					}
					, complete: function () {
						eventObj.val.common.isLoading = Number(0);    // 처리중 UnLock
					}
					, error: function (xhr, status, exception) {
						eventObj.val.msgBox.strMsg = "에러가 발생하였습니다.";
						eventObj.val.msgBox.open(0);
						eventObj.val.common.isLoading = Number(0);    // 처리중 UnLock
					}
				});
			}
			else {
				eventObj.val.common.isLoading = Number(0);    // 처리중 UnLock
			}
		});

		// 넥슨캐시 지급
		$(document).on('click', '.btnGetNexonCash', function () {
			// 처리중 체크
			if (eventObj.val.common.isLoading === 1) {
				eventObj.val.msgBox.strMsg = "처리중입니다.";
				eventObj.val.msgBox.open(0);
				return false;
			}
			eventObj.val.common.isLoading = Number(1);                  // 처리중 Lock

			if (eventObj.helperFn.isLoginCheck()) {
				// 지급정보저장
				eventObj.val.eventPage.n1RequestType = $(this).attr("data-n1requesttype");
				eventObj.val.eventPage.n4EventSeq = $(this).attr("data-n4eventseq");
				var isPayments = Number($(this).attr("data-ispayments"));
				var errMsg = $(this).attr("data-msg");

				if (Number(isPayments) < 0) {
					eventObj.val.msgBox.strMsg = errMsg;
					eventObj.val.msgBox.open(0);
					eventObj.val.common.isLoading = Number(0);          // 처리중 UnLock
					return false;
				}
				if (Number(isPayments) === 0) {
					$.ajax({
						url: 'Update_ajax.aspx'
						, type: "POST"
						, contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
						, data: ({
							  n1RequestType: eventObj.val.eventPage.n1RequestType
							, n4EventSeq: eventObj.val.eventPage.n4EventSeq
							, strQtDate: eventObj.val.common.strQtDate
							, strQtTime: eventObj.val.common.strQtTime
						})
						, cache: false
						, success: function (data) {
							eventObj.val.common.isLoading = Number(0);      // 처리중 UnLock

							var obj = $.parseJSON(data);

							switch (Number(obj.errorCode)) {
								case 0:
									$('#nexonCashNum').html(obj.strCashCouponNum);
									$('#nexonCash').show();
									break;
								default:
									eventObj.val.msgBox.strMsg = obj.errorMessage;
									eventObj.val.msgBox.open(0);
									break;
							}
						}
						, beforeSend: function () {
							eventObj.val.common.isLoading = Number(1);      // 처리중 Lock
						}
						, complete: function () {
							eventObj.val.common.isLoading = Number(0);      // 처리중 UnLock
						}
						, error: function (xhr, status, exception) {
							eventObj.val.msgBox.strMsg = '에러가 발생하였습니다.';
							eventObj.val.msgBox.open(0);
							eventObj.val.common.isLoading = Number(0);      // 처리중 UnLock
						}
					});
				}
			}
			else {
				eventObj.val.common.isLoading = Number(0);      // 처리중 UnLock
			}
		});
	}
	// Winter
	, Winter: function (reqCharClass) { }
};

$(document).ready(function () { });