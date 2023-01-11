const key="kyeAoFx2UIf2WEYHbGmylNEamIRtshf5";
const getCity= async (city)=>{
        const base="http://dataservice.accuweather.com/locations/v1/cities/search";
        const query=`?apikey=${key}&q=${city}`;
        const response= await fetch(base+query);
        const data=await response.json();
        return data[0];
}
const getInfo= async (id)=>{
        const base=`http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${key}`;
        const response=await fetch(base);
        const info=await response.json();
        return info[0];
}

const form=document.querySelector('.change-location');
const ipt=document.querySelector('.input');
const temp=document.querySelector('.temp');
const cityName=document.querySelector('.city-name');
const Wtext=document.querySelector('.WText');
const card=document.querySelector('.card');
const imgDN=document.querySelector('.card img');
const icon=document.querySelector('.icon img');

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    // const argument=ipt.value.trim()?ipt.value.trim():localStorage.location;
    getCity(ipt.value.trim()).then((data)=>{
        cityName.innerText=`${data.EnglishName},${data.Country.EnglishName}`;
        //setting localStorage;
        localStorage.setItem("location",data.EnglishName);
        console.log(data);
        return data.Key;
    }).then((id)=>{
        getInfo(id).then((data)=>{
            temp.innerHTML=data.Temperature.Metric.Value;
            Wtext.innerHTML=data.WeatherText;
            icon.setAttribute('src',`img/icons/${data.WeatherIcon}.svg`);
            imgDN.src=data.IsDayTime?"img/day.svg":"img/night.svg";
            if(card.classList.contains('d-none'))
            {
                card.classList.remove('d-none');
            }
            console.log(data);
        })
    }).catch(error=>{
        alert("Unable to fetch data");
    })

})
// using localstorage
if(localStorage.location)
{
    getCity(localStorage.location).then((data)=>{
        cityName.innerText=`${data.EnglishName},${data.Country.EnglishName}`;
        //setting localStorage;
        localStorage.setItem("location",data.EnglishName);
        console.log(data);
        return data.Key;
    }).then((id)=>{
        getInfo(id).then((data)=>{
            temp.innerHTML=data.Temperature.Metric.Value;
            Wtext.innerHTML=data.WeatherText;
            icon.setAttribute('src',`img/icons/${data.WeatherIcon}.svg`);
            imgDN.src=data.IsDayTime?"img/day.svg":"img/night.svg";
            if(card.classList.contains('d-none'))
            {
                card.classList.remove('d-none');
            }
            console.log(data);
        })
    }).catch(error=>{
        alert("Unable to fetch data");
    })
}