const key='kyeAoFx2UIf2WEYHbGmylNEamIRtshf5';
let locationdata;
const getCity= async (city)=>{
    const base="http://dataservice.accuweather.com/locations/v1/cities/search";
    const query=`?apikey=${key}&q=${city}`;
    const response=await fetch(base+query);
    const data =await response.json();
    locationdata=data[0];
    const id=data[0].Key;
    const current=`http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${key}`;
    const req=await fetch(current);
    const info=await req.json();
    console.log(data,info[0]);
    // console.log(id);
    return (/*Math.round*/(info[0]));
};
const fm=document.querySelector('.change-location');
const it=document.querySelector('.input');
const temp=document.querySelector('.temp');
const cityName=document.querySelector('.city-name');
const Wtext=document.querySelector('.WText');
const card=document.querySelector('.card');
const imgDN=document.querySelector('.card img');
const icon=document.querySelector('.icon img');
fm.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log(locationdata);
    getCity(it.value.trim()).then(data=>{
        cityName.innerText=it.value.trim();//data.EnglishName
        temp.innerHTML=data.Temperature.Metric.Value;
        Wtext.innerHTML=data.WeatherText;
        icon.setAttribute('src',`img/icons/${data.WeatherIcon}.svg`);
        imgDN.src=data.IsDayTime?"img/day.svg":"img/night.svg";
        // if(data.IsDayTime)
        // {
        //     imgDN.src="img/day.svg";
        // }
        // else
        // {
        //     imgDN.src="img/night.svg";
        // }
        if(card.classList.contains('d-none'))
        {
            card.classList.remove('d-none');
        }
    }).catch(err=>{
        alert("cannot fetch data");
    });

});
// getCity('Delhi');
// Temperature.Metric.Value
// getCity('delhi').then(data=>{
//     console.log(data.Key);
// }).catch(err=>{
//     console.log("some error occured")
// });