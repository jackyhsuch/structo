import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ListApp extends React.Component {
    constructor() {
        super()
        this.state = {
            countries: [
                'Afghanistan',
                'Australia',
                'Bangladesh',
                'Brazil',
                'Brunei',
                'Cambodia',
                'China',
                'Cuba',
                'Denmark',
                'Egypt',
                'Finland',
                'France',
                'Greece',
                'Hong Kong',
                'Singapore'
            ],
            filteredList: [],
            selectedList: [],
            active: false,
            typing: false
        }

    }

    componentWillMount() {
        this.setState({filteredList: this.state.countries})
    }

    filterList(e) {
        var list = this.state.countries
        var updatedList = list.filter(country => country.toLowerCase().startsWith(e.target.value.toLowerCase()))
 
        this.setState({filteredList: updatedList})
        this.setState({typing: (e.target.value !== '') ? true:false})

    }

    handleClick(e) {
        var updatedselectedList = this.state.selectedList


        // add selected to selectedList
        var selectedCountry = e.target.dataset.country
        updatedselectedList.push(selectedCountry)
        this.setState({selectedList: updatedselectedList})

        // remove selected from filtered and overall lists
        var list = this.state.countries
        var updatedList = list.filter(country => updatedselectedList.indexOf(country) === -1)
        var filteredList = this.state.filteredList
        var updatedFilteredList = filteredList.filter(country => updatedselectedList.indexOf(country) === -1)
        this.setState({
            countries: updatedList,
            filteredList: updatedFilteredList
        })
    }

    handleEnter(e) {
        if (e.keyCode === 13) {
            if (e.target.value !== '') {
                var updatedFilteredList = this.state.filteredList
                var updatedselectedList = this.state.selectedList
                if (updatedFilteredList.length > 0) {
                    // add selected to selectedList
                    var selectedCountry = updatedFilteredList[0]
                    updatedselectedList.push(selectedCountry)
                    this.setState({selectedList: updatedselectedList})

                    // remove selected from filteredList
                    this.setState({filteredList: updatedFilteredList.slice(1,)})

                    // remove selected from overall list
                    var list = this.state.countries
                    var updatedList = list.filter(country => updatedselectedList.indexOf(country) === -1)
                    this.setState({countries: updatedList})
                }
            }
        }
    }

    handleRemove(e) {
        var updatedselectedList = this.state.selectedList
        var selectedCountry = e.target.dataset.country

        // remove selected from selectedList
        var index = updatedselectedList.indexOf(selectedCountry)
        updatedselectedList.splice(index, 1)

        this.setState({selectedList: updatedselectedList})

        // add back selected to filtered and overall lists
        var list = this.state.countries
        var updatedList = list
        updatedList.push(selectedCountry)
        updatedList.sort()
        this.setState({
            countries: updatedList,
            filteredList: updatedList
        })
    }

    toggleAcitve(e) {
        var updatedActive = !this.state.active
        this.setState({active: updatedActive})
    }

    setDropdownClass(isShow, isTyping) {
        var hidden = (!isShow) ? "hidden":""
        var typing = (isTyping) ? "typing":""
        var classes = hidden + " " + typing + " dropdown"

        return classes

    }

    setDropdownButtonClass(isShow) {
        if (isShow) {
            return "glyphicon glyphicon-triangle-top"
        }

        return "glyphicon glyphicon-triangle-bottom"
    }

    render() {
        return (
            <div className="list-app">
                <div className="input-area" onClick={()=>this.textInput.focus()}>
                    {
                        this.state.selectedList.map(function(country) {
                            return (
                                <div 
                                    key={country}
                                    className="selected-tags"
                                    data-country={country}>
                                {country} <span 
                                            className="glyphicon glyphicon-remove tag-remove" 
                                            aria-hidden="true"
                                            data-country={country}
                                            onClick={e=>this.handleRemove(e)}></span>
                                </div>
                            )
                        }, this)
                    }
                    <input 
                        className="input"
                        type="text" 
                        onChange={e=>this.filterList(e)}
                        onKeyUp={e=>this.handleEnter(e)}
                        ref={input=>this.textInput = input}/>

                    <label className="input-btn" onClick={e=>this.toggleAcitve(e)}>
                    <span className={this.setDropdownButtonClass(this.state.active)} aria-hidden="true"></span>
                    </label>
                </div>
                <div className={this.setDropdownClass(this.state.active, this.state.typing)}>
                {
                    this.state.filteredList.map(function(country) {
                        return (
                            <div 
                                key={country}
                                data-country={country}
                                onClick={e=>this.handleClick(e)}>
                            {country}
                            </div>
                        )
                    }, this)
                }
                </div>
                <div className="clearfix"></div>
            </div>
        )
    }
}

ReactDOM.render(
  <ListApp />,
  document.getElementById('root')
);