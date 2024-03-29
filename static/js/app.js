//data endpoint
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

//log data
d3.json(url).then(function(data) {
  console.log(data);
});

function init() {
d3.json(url).then(function(data) {
   let samples = data.samples;
   console.log(samples);
   let sample1 = samples[0];
   console.log(sample1);
   let sample1_values = sample1.sample_values;
   console.log(sample1_values);
   let sample1_otu_ids = sample1.otu_ids;
   console.log(sample1_otu_ids);
   let sample1_otu_labels = sample1.otu_labels
   console.log(sample1_otu_labels);

   let bar_data = [{
   x: sample1_values.slice(0,9).reverse(),
   y: sample1_otu_ids.slice(0,9).reverse().map(id => `OTU ${id}`),
   text: sample1_otu_labels.slice(0,9).reverse(),
   type: "bar",
   orientation: 'h'
  }];

  let bar_layout = {
    height: 700,
    width: 500,
  };

  Plotly.newPlot("bar", bar_data, bar_layout);

  let bubble_data = [{
  x: sample1_otu_ids,
  y: sample1_values,
  text: sample1_otu_labels,
  mode: "markers",
  marker: {
    color: sample1_otu_ids,
    size: sample1_values,
  }
  }];

  let bubble_layout = {
    height: 500,
    width: 1500,
  };

  Plotly.newPlot("bubble", bubble_data, bubble_layout);

})};


init();