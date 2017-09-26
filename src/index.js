import React from 'react';
import ReactDOM from 'react-dom';


class ListApp extends React.Component {
    constructor() {
        super()
        this.state = {
            countries: [
                'Singapore',
                'Taiwan',
                'Malaysia'
            ],
            filteredList: [],
            selectedList: []
        }

    }

    componentWillMount() {
        this.setState({filteredList: this.state.countries})
    }

    filterList(e) {
        var list = this.state.countries
        var updatedList = list.filter(function(country) {
            if (country.toLowerCase().search(e.target.value.toLowerCase()) !== -1) {
                return country
            }
        })
        this.setState({filteredList: updatedList})
    }

    handleClick(e) {
        var updatedselectedList = this.state.selectedList


        // add selected to selectedList
        var selectedCountry = e.target.dataset.country
        updatedselectedList.push(selectedCountry)
        this.setState({selectedList: updatedselectedList})

        // remove selected from filtered and overall lists
        var list = this.state.countries
        var updatedList = list.filter(function(country) {
            if (updatedselectedList.indexOf(country) === -1) {
                return country
            }

        })
        this.setState({
            countries: updatedList,
            filteredList: updatedList
        })
    }

    handleEnter(e) {
        if (e.keyCode === 13) {
            if (e.target.value !== '') {
                var updatedFilteredList = this.state.filteredList
                var updatedselectedList = this.state.selectedList

                // add selected to selectedList
                var selectedCountry = updatedFilteredList[0]
                updatedselectedList.push(selectedCountry)
                this.setState({selectedList: updatedselectedList})

                // remove selected from filteredList
                this.setState({filteredList: updatedFilteredList.slice(1,)})

                // remove selected from overall list
                var list = this.state.countries
                var updatedList = list.filter(function(country) {
                    if (updatedselectedList.indexOf(country) === -1) {
                        return country
                    }

                })
                this.setState({countries: updatedList})
            }
        }
    }

    render() {
        return (
            <div className="list-app">
                <div>
                {
                    this.state.selectedList.map(function(country) {
                        return (
                            <div 
                                key={country}
                                data-country={country}
                            >{country}</div>
                        )
                    })
                }
                </div>
                <input type="text" 
                    onChange={e => this.filterList(e)}
                    onKeyUp={e => this.handleEnter(e)}
                />
                <div>
                {
                    this.state.filteredList.map(function(country) {
                        return (
                            <div 
                                key={country}
                                data-country={country}
                                onClick={e => this.handleClick(e)}
                            >{country}</div>
                        )
                    }, this)
                }
                </div>
            </div>
        )
    }
}

ReactDOM.render(
  <ListApp />,
  document.getElementById('root')
);