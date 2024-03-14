import React from 'react';
const Languageoption = (props) => {
    return (
        <div >
            <select className="form-select" onChange={props.onChange} >
                <option value={'en'} selected={localStorage.getItem('selectedLanguage')==='en'?true:false}>English</option>
                <option value={'hi'} selected={localStorage.getItem('selectedLanguage')==='hi'?true:false}>हिन्दी</option>
            </select>
        </div>
    )
}
export default Languageoption;


