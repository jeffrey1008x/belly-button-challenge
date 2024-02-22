const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let metadata = [];
let names = [];
let samples = [];

// Fetch the JSON data and console log it
let dataPromise = d3.json(url).then(function(data) {

  d3.select("#selDataset").append("option").attr("value","").html('--Choose an ID--');

  console.log(data);


  metadata = data.metadata;
  names = data.names;
  samples = data.samples;

  for (let i = 0; i < names.length; i++) {
    d3.select("#selDataset").append("option").attr("value",names[i]).html(names[i]);
  }
  
});

function optionChanged(id) {

  if (id != '') {
    console.log(id);

    function select_by_id(x) {
      return x.id == id;
    }

    let selected_metadata = metadata.filter(select_by_id);
    let selected_sample = samples.filter(select_by_id);

    //console.log(selected_metadata);
    if (selected_metadata.length > 0) {
      displayMetaData(selected_metadata[0]);
    }

    if (selected_sample.length > 0) {
      barPlot(selected_sample[0]);
    }

    if (selected_sample.length > 0) {
      bubblePlot(selected_sample[0]);
    }
  }
  
}

function displayMetaData(m) {
  //console.log(m);
  for (var key in m){
    let info = key + ": " + m[key];
    d3.select("#sample-metadata").append("h6").html(info);
  }
}

function barPlot(s) {
  //console.log(s);
  otu_str = s.otu_ids.map(function(e){return 'OTU ' + e.toString()});
  //console.log(otu_str);

  let data1 = {
    y: otu_str.slice(0, 10).reverse(),
    x: s.sample_values.slice(0, 10).reverse(),
    text: s.otu_labels.slice(0, 10).reverse(),
    type: 'bar',
    orientation: 'h'
  };
  
  let data = [data1];
  let layout = {};

  Plotly.newPlot("bar", data, layout);
}

function bubblePlot(s) {
  console.log(s);

  let data1 = {
    x: s.otu_ids,
    y: s.sample_values,
    text: s.otu_labels,
    mode: 'markers',
    marker: {
      color: s.otu_ids,
      size: s.sample_values
    }
  };
  
  let data = [data1];
  let layout = {
    xaxis: {
      title: {
        text: 'OTU ID'
      }
    }
  };

  Plotly.newPlot("bubble", data, layout);
}