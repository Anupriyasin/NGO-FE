import React from 'react';
const Languageoption = (props) => {
    return (
        <div >
            <select className="form-select" onChange={props.onChange} >
                <option value={'en'} selected={localStorage.getItem('selectedLanguage')==='en'?true:false}>English</option>
                <option value={'odi'} selected={localStorage.getItem('selectedLanguage')==='odi'?true:false}>Odia</option>
            </select>
        </div>
    )
}
export default Languageoption;


