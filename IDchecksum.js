$ui.render({
  props: {
    title: "Design Fee"
  },
  views: [
    {
      type: "input",
      props: {
        type: $kbType.decimal
      },
      layout: function(make) {
        make.left.top.equalTo(10);
        make.size.equalTo($size(256, 32));
      },
      events: {
        ready: function(sender) {
          sender.focus();
        },
        changed: function(sender) {
          calculate();
        }
      }
    },
    {
      type: "label",
      props: {
        font: $font("bold", 20),
        align: $align.center,
        lines: 2
      },
      layout: function(make) {
        make.centerY.equalTo($("input"));
        make.right.inset(10);
        make.left.equalTo($("input").right).offset(10);
      }
    }
  ]
});

function calchecksum(idstr) {
	var w = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2); //系数
	var checksum = new Array('1','0','X','9','8','7','6','5','4','3','2');  //校验码对照表
	var id_array = idstr.split("");
	var sum = 0;
    for(var k=0; k<17; k++) {
        sum+=parseInt(id_array[k])*parseInt(w[k]);
    }
    return checksum[sum%11].toUpperCase()
}

function calculate() {
  var input = Number($("input").text);
  if (!Number.isInteger(input)) {
  	$("label").text = "Invalid Input!";
  	return;
  }
  if ($("input").text.length < 17 ) {
  	$("label").text = "Must be 17 digits (trimmed if longger).";
  	return;
  }
  var checksum = calchecksum($("input").text);

  $("label").text = "checksum is " + checksum;
}
    
