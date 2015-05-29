var util = require('util');

exports.getConnects = function(req, res, next) {	
	/*req format:{
		scope: d/m/y,
    type: "range","actual","number"
    metadata: {<type>}
		<range>: {
			from: date,
			to: date
		}
    <actual>: {
    }    
    <number>: {
      number: integer
    }        

	}*/
  var Connect;

  var match={},project={},group={};
  var actualDate=new Date();
  if (!req.body.metadata.from){
    req.body.metadata.from=actualDate;
  }else{
    req.body.metadata.from=new Date(req.body.metadata.from);
  }  
  if (!req.body.metadata.to){
    req.body.metadata.to=actualDate;
  }else{
    req.body.metadata.to=new Date(req.body.metadata.to);
  }

  if (req.body.scope==="d"){
    Connect = require('mongoose').model('ConnectDaily');
    if (req.body.type==="range"){
      var fy=req.body.metadata.from.getFullYear(),
      fm=("0" + (req.body.metadata.from.getMonth())).slice(-2),
      fd=("0" + (req.body.metadata.from.getDate())).slice(-2),
      fh=parseInt(("0" + (req.body.metadata.from.getHours())).slice(-2)),
      idf=parseInt(fy+fm+fd);
      
      
      var ty=req.body.metadata.to.getFullYear(),
      tm=("0" + (req.body.metadata.to.getMonth())).slice(-2),
      td=("0" + (req.body.metadata.to.getDate())).slice(-2),
      th=parseInt(("0" + (req.body.metadata.to.getHours())).slice(-2));
      idt=parseInt(ty+tm+td);

      match={
        id:{$gte: ""+idf, $lte: ""+idt}
      };

      project={
        _id:0,
       "id":"$id",
       "app": "$metadata.app.name",
       "version": "$metadata.app.version",
       "0":"$hourly.0",
       "1":"$hourly.1",
       "2":"$hourly.2",
       "3":"$hourly.3",
       "4":"$hourly.4",
       "5":"$hourly.5",
       "6":"$hourly.6",
       "7":"$hourly.7",       
       "8":"$hourly.8",
       "9":"$hourly.9",
       "10":"$hourly.10",
       "11":"$hourly.11",       
       "12":"$hourly.12",
       "13":"$hourly.13",
       "14":"$hourly.14",
       "15":"$hourly.15",       
       "16":"$hourly.16",
       "17":"$hourly.17",
       "18":"$hourly.18",
       "19":"$hourly.19",       
       "20":"$hourly.20",
       "21":"$hourly.21",
       "22":"$hourly.22",
       "23":"$hourly.23"  
      };      
    }
    
    group={
      _id: {app:"$metadata.app.name",version:"$metadata.app.version"}, 
      "00":{ $sum: "$00" },      
      "01":{ $sum: "$01" },
      "02":{ $sum: "$02" },
      "03":{ $sum: "$03" },
      "04":{ $sum: "$04" },
      "05":{ $sum: "$05" },
      "06":{ $sum: "$06" },
      "07":{ $sum: "$07" },
      "08":{ $sum: "$08" },
      "09":{ $sum: "$09" },
      "10":{ $sum: "$10" },
      "11":{ $sum: "$11" },      
      "12":{ $sum: "$12" },
      "13":{ $sum: "$13" },
      "14":{ $sum: "$14" },
      "15":{ $sum: "$15" },
      "16":{ $sum: "$16" },      
      "17":{ $sum: "$17" },
      "18":{ $sum: "$18" },
      "19":{ $sum: "$19" },
      "20":{ $sum: "$20" },
      "21":{ $sum: "$21" },      
      "22":{ $sum: "$22" },
      "23":{ $sum: "$23" }
    }



  }else if (req.body.scope==="m"){
    Connect = require('mongoose').model('ConnectMonthly');
    if (req.body.type==="range"){
      var fy=req.body.metadata.from.getFullYear(),
      fm=("0" + (req.body.metadata.from.getMonth())).slice(-2),
      fd=("0" + (req.body.metadata.from.getDate())).slice(-2),
      idf=parseInt(fy+fm);
      var ty=req.body.metadata.to.getFullYear(),
      tm=("0" + (req.body.metadata.to.getMonth())).slice(-2),
      td=("0" + (req.body.metadata.to.getDate())).slice(-2),
      idt=parseInt(ty+tm);

      agreggate.$match={
        id:{$gte: idf, $lte: idt}
      }

    }    
  }else if (req.body.scope==="y"){
    Connect = require('mongoose').model('ConnectYearly');
    if (req.body.type==="range"){
      var fy=req.body.metadata.from.getFullYear(),
      fm=("0" + (req.body.metadata.from.getMonth())).slice(-2),
      idf=parseInt(fy);
      var ty=req.body.metadata.to.getFullYear(),
      tm=("0" + (req.body.metadata.to.getMonth())).slice(-2)
      idt=parseInt(ty);

      agreggate.$match={
        id:{$gte: idf, $lte: idt}
      }

    }        
  }
  
  //console.log(util.inspect(match));
  Connect.aggregate([{$match:match},{$project:project}],function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        res.json(result);
    });

	
};