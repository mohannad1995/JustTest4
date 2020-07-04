var Arabic = /^[\u0621-\u064A0-9 ]+$/;


$(document).ready(function() {
  $(".datetime").mask("9999/99/99", { placeholder: "__/__/____" });
});
function checkName(e) {
  var TextInput = e.val();
  TextInput = TextInput.replace("د ال", "دال");
  TextInput = TextInput.replace("ذو ال", "ذوال");
  TextInput = TextInput.replace("د  ال", "دال");
  TextInput = TextInput.replace("ذو  ال", "ذوال");
  TextInput = TextInput.replace("أ", "ا");
  TextInput = TextInput.replace("ة", "ه");
  TextInput = TextInput.replace("ؤ", "و");
  TextInput = TextInput.replace("  ", " ");
  TextInput = TextInput.replace("   ", " ");
  TextInput = TextInput.replace("فقط", " ");
  TextInput = TextInput.replace("لايوجد", " ");
  TextInput = TextInput.replace("لا يوجد", " ");
  TextInput = TextInput.replace("السيد", " ");
  e.val(TextInput);
 
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (year.length < 2) year = "0" + year;
  if (day.length < 2) day = "0" + day;

  return [year, day, month].join("/");
}
function maxDate(e) {
  var dtToday = new Date();
  var monthNow = dtToday.getMonth() + 1;
  var dayNow = dtToday.getDate();
  var yearNow = parseInt(dtToday.getFullYear());
  var inputdate = e.val().split("/");
  var year = inputdate[0];
  var month = inputdate[1];
  var day = inputdate[2];
  if (e.hasClass("birthdate")) {
    yearNow -= 18;
  }
  if (
    year > yearNow ||
    (year == yearNow && month > monthNow) ||
    ((year == yearNow && month == monthNow && day > dayNow) || year < 1920)
  ) {
    if (e.hasClass("birthdate")) {
      e.parent("div")
        .find($(".maxdate"))
        .html("يجب ان يكون العمر على الاقل 18 سنة ومواليده اكبر من سنة 1920");
    } else {
      e.parent("div")
        .find($(".maxdate"))
        .html("اكتب تاريخ اصغر من التاريخ الحالي و اكبر من سنة 1920");
    }
  } else {
    e.parent("div")
      .find($(".maxdate"))
      .html(" ");
  }
}
function lastdate(e) {
  var mydate = new Date();
  var monthNow = mydate.getMonth() + 1;
  var dayNow = mydate.getDate();
  var yearNow = parseInt(mydate.getFullYear());
  var inputdate = e.val().split("/");
  var year = inputdate[0];
  var month = inputdate[1];
  var day = inputdate[2];
  if (e.hasClass("birthdate")) {
    yearNow -= 17;
  }
  if (
    year > yearNow ||
    (year == yearNow && month > monthNow) ||
    ((year == yearNow && month == monthNow && day > dayNow) || year < 1940)
  ) {
    if (e.hasClass("birthdate")) {
      e.parent("div")
        .find($(".maxdate"))
        .html("يجب ان يكون العمر على الاقل 18 سنة ومواليده اكبر من سنة 1940");
    } else {
      e.parent("div")
        .find($(".maxdate"))
        .html("اكتب تاريخ اصغر من التاريخ الحالي و اكبر من سنة 1940");
    }
  } else {
    e.parent("div")
      .find($(".maxdate"))
      .html(" ");
  }
}

jQuery(document).delegate("button.btn-title", "click", function(e) {
  (function($) {
    $.fn.tmpl = function(obj) {
      var _this = this,
        el = $(this);

      return (function() {
        var original = el.html();

        el.html(
          el.html().replace(/{{([^}}]+)}}/g, function(wholeMatch, key) {
            var substitution = obj[$.trim(key)];

            return typeof substitution == "undefined"
              ? wholeMatch
              : substitution;
          })
        );

        return el.html() == original ? _this : $(el).tmpl(obj);
      })();
    };
  })(jQuery);
  var temp = $("#FamilyTemp").html(),
    size = $("#BodyFamily>tr").length;
  $(temp)
    .tmpl({
      greeting: size + 1
    })
    .appendTo($("#BodyFamily"));
  temp.find("#deleteBtn").attr("data-id", size);
  e.removeClass("addRectangular");
  e.attr("disabled", "disabled");
  $(e).attr("disabled", "disabled");
  $("#BodyFamily").append("#FamilyTemp");
  
  
});

function deleteRow(row) {
  row
    .parent()
    .parent()
    .remove();
  $("#BodyFamily tr").each(function(index) {
    $(this)
      .find("td.idx")
      .html(index + 1);
  });
}
$(document).ready(function() {
  $("input.number").bind("keypress", function(e) {
    return e.which != 8 &&
      e.which != 0 &&
      (e.which < 48 || e.which > 57) &&
      e.which != 46
      ? false
      : true;
  });
 
  $(document).ready(function () {
    jQuery.validator.addClassRules('familyName', {
        required: true,
        isArabic: true,
        isFullName: true,
    });
    $.validator.messages.required = 'هذا الحقل مطلوب ';
    $.validator.messages.isArabic = 'اكتب باللغة العربية ';
    $.validator.messages.isFullName = "يجب ان يكون الاسم ثلاثي";
    
  $("#employeeForm").validate({
    ignore: "",
    onkeyup: function(element, event) {
      this.element(element);
    },
    rules: {
      'PersonalInfo.FirstName': {
        required: true,
        Arabic: true
      },
      SecondName: {
        required: true,
        Arabic: true
      },
      ThirdName: {
        required: true,
        Arabic: true
      },
      FourthName: {
        required: true,
        Arabic: true
      },
      SureName: {
        Arabic: true
      },
      MotherFirstName: {
        required: true,
        Arabic: true
      },
      MothersecondtName: {
        required: true,
        Arabic: true
      },
      MotherThirdName: {
        Arabic: true
      },

      "PersonalInfo.NationalNo": {
        required: true,
        minlength: 12,
        maxlength: 12
      },
      "PersonalInfo.NationalNo": {
        required: true,
        minlength: 12,
        maxlength: 12
      },
      "PersonalInfo.IdentifyNo": {
        required: true,
        maxlength: 8
      },
      "PersonalInfo.IdentifyRecord": {
        required: true,
        maxlength: 6
      },
      "PersonalInfo.IdentifyPage": {
        required: true,
        maxlength: 6
      },
      "PersonalInfo.IdentifyName": {
        required: true,
        isArabic: true
      },
      "PersonalInfo.MobileNo": {
        maxlength: 15
      },
      "PersonalInfo.Email": {
        email: true
      },
      "RetireInfo.OldPensionNo": {
        required: true,
        minlength: 10,
        maxlength: 10
      },
      "JobInfo.AgeDecisionNo": {
        required: true
      },
      "JobInfo.LastBonusDate": {
        required: true,
        inputDateAfterBirthdateplus18years: true,
        inputDateAfter1940Year: true,
        inputDateBeforeCurrentDate: true,
        isValidDate: true
      },
      "family": {
          required: true,
          isArabic: true,
          isFullName: true,
      },
      "JobInfo.SubDirectorateEmail": {
        email: true
      }
    },
    messages: {
      'PersonalInfo.FirstName': {
        required: "الاسم الاول مطلوب",
        Arabic: "اكتب الاسم باللغة العربية"
      },
      SecondName: {
        required: "اسم الاب مطلوب",
        Arabic: "اكتب الاسم باللغة العربية"
      },
      ThirdName: {
        required: "اسم الجد مطلوب",
        Arabic: "اكتب الاسم باللغة العربية"
      },
      FourthName: {
        required: "الاسم الرباعي مطلوب",
        Arabic: "اكتب الاسم باللغة العربية"
      },
      SureName: {
        Arabic: "اكتب اللقب باللغة العربية"
      },

      MotherFirstName: {
        required: "اسم الام مطلوب",
        Arabic: "اكتب اسم الام باللغة العربية "
      },
      MothersecondtName: {
        required: "اسم اب الام مطلوب",
        Arabic: "اكتب اسم الام باللغة العربية "
      },
      MotherThirdName: {
        Arabic: "اكتب اسم الام باللغة العربية "
      },
      "PersonalInfo.NationalNo": {
        required: "الرقم الوطني الموحد مطلوب ",
        minlength: "يجب ان يكون هذا الحقل مكون من 12 رقم",
        maxlength: "يجب ان يكون هذا الحقل مكون من 12 رقم"
      },
      "PersonalInfo.IdentifyNo": {
        required: "رقم هوية الأحوال مطلوب ",
        maxlength: "يجب ان لا يتجاوز طول هذا الحقل 8 ارقام"
      },
      "PersonalInfo.IdentifyRecord": {
        required: "الصحيفة لهوية الاحوال مطلوب ",
        maxlength: "يجب ان لا يتجاوز طول هذا الحقل 6 ارقام"
      },
      "PersonalInfo.IdentifyPage": {
        required: "الصحيفة لهوية الاحوال مطلوب ",
        maxlength: "يجب ان لا يتجاوز طول هذا الحقل 6 ارقام"
      },
      "PersonalInfo.IdentifyName": {
        required: " اسم دائرة الاحوال مطلوب ",
        isArabic: "يجب ان يكون اسم دائرة الاحوال باللغة العربية"
      },
      "PersonalInfo.MobileNo": {
        maxlength: "يجب ان لا يتجاوز طول هذا الحقل 15 رقم"
      },
      "PersonalInfo.Email": {
        email: " ادخل بريد الكتروني صحيح "
      },
      "RetireInfo.OldPensionNo": {
        required: "الرقم التقاعدي مطلوب",
        minlength: "يجب ان يكون طول هذا الحقل 10 ارقام فقط",
        maxlength: "يجب ان يكون طول هذا الحقل 10 ارقام فقط"
      },
      "JobInfo.AgeDecisionNo": {
        required: "رقم قرار تثبيت العمر مطلوب"
      },
      "JobInfo.LastBonusDate": {
        required: "تاريخ اخر علاوة مطلوب",
        inputDateAfterBirthdateplus18years:
          " يجب ان يكون تاريخ اخر علاوة اكبر من تاريخ الولادة ب 18 سنة على اقل تقدير ",
        inputDateAfter1940Year: "يجب ان يكون تاريخ اخر علاوة اكبر من سنة 1940",
        inputDateBeforeCurrentDate:
          "يجب ان يكون تاريخ اخر علاوة اصغر من التاريخ الحالي",
        isValidDate: "صيغة التاريخ خطأ"
      },
      "family": {
          required: "هذا الحقل مطلوب",
          isArabic: 'اكتب باللغة العربية',
          isFullName: "يجب ان يكون الاسم ثلاثي",
      },
      "JobInfo.SubDirectorateEmail": {
        email: "اكتب البريد الألكتروني بالشكل الصحيح"
      }
    }
  });
});

$('.checkName').keydown(function (e) {
  var key = e.keyCode;
  if (key > 47 && key < 58) {
      e.preventDefault();
  }
  else {
      if (e.shiftKey || e.ctrlKey || e.altKey) {
          e.preventDefault();
      }
  }
});
  $("#statusMar").change(function() {
    var theVal = $(this).val();
    switch (theVal) {
      case "0":
        $("#AddFamily").prop("disabled", true);
        $("#BodyFamily").html("");
        break;
      case "1":
        $("#AddFamily").prop("disabled", false);
        break;
      case "2":
        $("#AddFamily").prop("disabled", false);
        break;
      case "3":
        $("#AddFamily").prop("disabled", false);
        break;
    }
  });
  $("subTitle").change(function() {
    var theVal = $(this).val();
    switch (theVal) {
      case "0":
        $("#numberperso").prop("disabled", true);
        $("#numberperso").html("");
        break;
      case "1":
        $("#numberperso").prop("disabled", true);
        break;
      case "2":
        $("#numberperso").prop("disabled", true);
        break;
      case "3":
        $("#numberperso").prop("disabled", false);
        break;
    }
  });
  // $(function() {
  //   $('select[name="subTitle"]').change(function() {
  //     if ($(this).val() == "0") {
  //       $(".familyPensionNo").removeAttr("readonly");
  //     } else {
  //       $(".familyPensionNo").val("");
  //       $(".familyPensionNo").attr("readonly", "readonly");
  //     }
  //   });
  // });
  
  $(".IdentifyName").keydown(function(e) {
    var key = e.keyCode;
    if ((key > 51 && key < 58) || key == 48) {
      e.preventDefault();
    }
  });

  $(function() {
    $('input:radio[name="optradio"]').change(function() {
      if ($(this).val() == "0") {
        $(".OldPensionNo").removeAttr("readonly");
      } else {
        $(".OldPensionNo").val("");
        $(".OldPensionNo").attr("readonly", "readonly");
      }
    });
  });
  $.validator.addMethod("isFullName", function(value) {
    var count = value.split(" "),
      Len = 0;
    for (var i = 0; i < count.length; i++) {
      if (count[i] != "") {
        Console.log("hello");
        Len++;
      }
    }
    return Len < 3 ? false : true;
  });

  $("#identifySr").change(function() {
    var theVal = $(this).val();
    switch (theVal) {
      case "0":
        $("#input14").prop("disabled", true);
        $("#input19").prop("disabled", true);
        $("#input20").prop("disabled", false);
        $("#input21").prop("disabled", false);
        $("#input22").prop("disabled", false);
        $("#input23").prop("disabled", false);

        break;
      case "1":
        $("#input14").prop("disabled", true);
        $("#input20").prop("disabled", true);
        $("#input21").prop("disabled", true);
        $("#input22").prop("disabled", true);
        $("#input23").prop("disabled", true);
        $("#input14").prop("disabled", true);
        $("#input19").prop("disabled", false);
        break;
      case "2":
        $("#input19").prop("disabled", true);
        $("#input20").prop("disabled", true);
        $("#input21").prop("disabled", true);
        $("#input22").prop("disabled", true);
        $("#input23").prop("disabled", true);
        $("#input14").prop("disabled", false);
        break;
    }
  });
   $.validator.messages.maxlength = "يجب ان يكون طول هذا الحقل {0} ارقام";

  $.validator.addMethod("Arabic", function(value) {
    if (value == "" || value == null) {
      return true;
    } else {
      return Arabic.test(value);
    }
  });
  $.validator.addMethod("isValidDate", function(value) {
    // if (value != "") {
    var d = moment(value, "YYYY/MM/DD");
    return value.indexOf(d.format("YYYY/MM/DD"));
    //  dateFormat : "YYYY/MM/DD";
    // }
    date: {
      format: "YYYY/MM/DD";
      message: "hfjh df kjds kjsd";
    }
    // return true;
  });

  $.validator.addMethod("inputDateAfter1940Year", function(value) {
    if (value != "") {
      var inputDate = value
        .split("/")
        .reverse()
        .join("-");
      return moment(inputDate).isSameOrAfter("1940-01-01", "year");
    }
    return true;
  });
  $.validator.addMethod("inputDateAfterBirthdateplus18years", function(value) {
    var BirthdatePlus18Years = moment(
      $("#JobInfo.LastBonusDate")
        .val()
        .split("/")
        .reverse()
        .join("-")
    )
      .add(18, "years")
      .format("YYYY-MM-DD");
    var inputDate = value
      .split("/")
      .reverse()
      .join("-");
    return moment(inputDate).isSameOrAfter(BirthdatePlus18Years, "days");
  });
  $.validator.addMethod("inputDateAfter1920Year", function(value) {
    if (value != "") {
      var inputDate = value
        .split("/")
        .reverse()
        .join("-");
      return moment(inputDate).isSameOrAfter("1920-01-01", "year");
    }
    return true;
  });


});
