const rates = [4.5, 3.967, 3.58, 3.25, 3.005, 2.857, 2.76, 2.62, 2.436, 2.306, 2.225, 2.167, 2.057, 1.913, 1.810, 1.747, 1.701, 1.616, 1.6];
const ranges = [0, 200, 500, 1000,3000,5000,8000,10000,20000,40000,60000,80000,100000,200000,400000,600000,800000,1000000,2000000];
const bases = [0,9,20.9,38.8,103.8,163.9,249.6,304.8,566.8,1054,1515.2,1960.1,2393.4,4450.8,8276.7,11897.5,15391.4,18793.8,34948.9];

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

function calculate() {
  var origin = Number($("input").text);
  var stage = 0;

  for (var i = 1; i < 17; i++) { 
    if (origin >= ranges[i]) {
      stage += 1;
    } else { break; };
  };

  var fee = bases[stage] + (origin - ranges[stage])/ 100.0 * rates[stage]
  
  $("label").text =
    bases[stage] + 
    " + ( " +
    origin +
    " - " +
    ranges[stage] +
    " ) x " +
    rates[stage] +
    " % = " +
    fee.toFixed(2);
}
    
