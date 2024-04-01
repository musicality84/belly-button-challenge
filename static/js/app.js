//data endpoint
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

//log data
d3.json(url).then(function(data) {
  console.log(data);
});

//set initial elements
function init() {
d3.json(url).then(function(data) {
   //set needed variables for bar and bubble chart, and limit to 1st subject
   let samples = data.samples;
   //console.log(samples);
   let subject1 = samples[0];
   //console.log(subject1);
   let subject1_values = subject1.sample_values;
   //console.log(subject1_values);
   let subject1_otu_ids = subject1.otu_ids;
   //console.log(subject1_otu_ids);
   let subject1_otu_labels = subject1.otu_labels
   //console.log(subject1_otu_labels);

   //set up bar chart
   let bar_data = [{
   x: subject1_values.slice(0,9).reverse(),
   y: subject1_otu_ids.slice(0,9).reverse().map(id => `OTU ${id}`),
   text: subject1_otu_labels.slice(0,9).reverse(),
   type: "bar",
   orientation: 'h'
  }];

  let bar_layout = {
    height: 700,
    width: 500,
  };

  Plotly.newPlot("bar", bar_data, bar_layout);

  //set up bubble chart
  let bubble_data = [{
  x: subject1_otu_ids,
  y: subject1_values,
  text: subject1_otu_labels,
  mode: "markers",
  marker: {
    color: subject1_otu_ids,
    size: subject1_values,
  }
  }];

  let bubble_layout = {
    height: 500,
    width: 1500,
  };

  Plotly.newPlot("bubble", bubble_data, bubble_layout);

  //set up demographics chart
  let metadata = data.metadata;
  //console.log(metadata);
  let subject1_metadata = metadata[0];
  //console.log(subject1_metadata);

  d3.select("#sample-metadata").append("p").text(`ID: ${subject1_metadata.id}`);
  d3.select("#sample-metadata").append("p").text(`Ethnicity: ${subject1_metadata.ethnicity}`);
  d3.select("#sample-metadata").append("p").text(`Gender: ${subject1_metadata.gender}`);
  d3.select("#sample-metadata").append("p").text(`Age: ${subject1_metadata.age}`);
  d3.select("#sample-metadata").append("p").text(`Location: ${subject1_metadata.location}`);

  let wfreq  = subject1_metadata.wfreq;
  console.log(wfreq);

  let gauge_data = [{
        type: "indicator",
		value: wfreq,
		title: { text: "Belly Button Washing Frequency Per Week", font:{ size:24}},
		text: "Scrubs Per Week",
		mode: "gauge",
		gauge: {
            axis: { range: [null, 9]},
            }
	}];

  let gauge_layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

  Plotly.newPlot("gauge", gauge_data, gauge_layout);

  //set up dropdown menu options
  let ids = data.names;
  //console.log(ids);
  for (let i=0; i < ids.length;i++){
    d3.select("#selDataset").append("option").text(ids[i])};

})};

d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly() {
  let dropdownMenu = d3.select("#selDataset");
  let dataset = dropdownMenu.property("value"); //note: I had to modify the html code for this part
  //because I couldn't get it to work otherwise
  d3.json(url).then(function(data) {
   //set needed variables for bar and bubble chart, and limit to selected subject
   let samples = data.samples;
   function filtered(value) {
     return value.id == dataset};
   console.log(samples);
   let subject = samples.filter(filtered);
   console.log(subject);
   let subject_values = subject[0].sample_values;
   //console.log(subject_values);
   let subject_otu_ids = subject[0].otu_ids;
   //console.log(subject_otu_ids);
   let subject_otu_labels = subject[0].otu_labels
   //console.log(subject_otu_labels);

   let bar_data = [{
   x: subject_values.slice(0,9).reverse(),
   y: subject_otu_ids.slice(0,9).reverse().map(id => `OTU ${id}`),
   text: subject_otu_labels.slice(0,9).reverse(),
   type: "bar",
   orientation: 'h'
   }];

   let bar_layout = {
    height: 700,
    width: 500,
  };

  Plotly.newPlot("bar", bar_data, bar_layout);

  let bubble_data = [{
  x: subject_otu_ids,
  y: subject_values,
  text: subject_otu_labels,
  mode: "markers",
  marker: {
    color: subject_otu_ids,
    size: subject_values,
  }
  }];

  let bubble_layout = {
    height: 500,
    width: 1500,
  };

  Plotly.newPlot("bubble", bubble_data, bubble_layout);

  let metadata = data.metadata;
  //console.log(metadata);
  let subject_metadata = metadata.filter(filtered);
  //console.log(subject_metadata);
  let subject_meta = subject_metadata[0];
  //console.log(subject_meta);

  d3.select("#sample-metadata").html("");
  d3.select("#sample-metadata").append("p").text(`ID: ${subject_meta.id}`);
  d3.select("#sample-metadata").append("p").text(`Ethnicity: ${subject_meta.ethnicity}`);
  d3.select("#sample-metadata").append("p").text(`Gender: ${subject_meta.gender}`);
  d3.select("#sample-metadata").append("p").text(`Age: ${subject_meta.age}`);
  d3.select("#sample-metadata").append("p").text(`Location: ${subject_meta.location}`);

  let wfreq  = subject_meta.wfreq;
  console.log(wfreq);

  let gauge_data = [{
        type: "indicator",
		value: wfreq,
		title: { text: "Belly Button Washing Frequency Per Week", font:{ size:24}},
		text: "Scrubs Per Week",
		mode: "gauge",
		gauge: {
            axis: { range: [null, 9]},
            }
	}];

  let gauge_layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

  Plotly.newPlot("gauge", gauge_data, gauge_layout);

  });

};

init();