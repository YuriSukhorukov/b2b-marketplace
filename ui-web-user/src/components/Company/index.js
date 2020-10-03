import React            from 'react';

import { 
    Button, 
    Input 
} from 'antd';

import { 
    Switch, 
    Route, 
    Link, 
    Redirect, 
    useHistory 
} from 'react-router-dom';

import companyStore     from '../../stores/companyStore';

const TAX_NUMBER = 443531283;

const Search = (props) => {
    return(
        <>
            <div>Search Companies</div>
        </>
    )
}
const Saved = (props) => {
    return(
        <>
            <div>Saved Companies</div>
        </>
    )
}
const Page = (props) => {
    return(
        <>
            <h1>Page {props.match.params.tax_number}!</h1>
            <Link to={`/company/edit`} >
                <Button type="primary">
                    <span>
                        Edit
                    </span>
                </Button>
            </Link>
        </>
    )
}

class Edit extends React.Component {
    constructor(props) {
        super(props);
    }
    editProfile() {
        companyStore.setProfileLegalType('ООО');
        companyStore.setProfileName('Трубы плюс +');
        companyStore.setProfileTaxNumber(4322333112);
        companyStore.editProfile();
    }
    render() {
        return(
            <>
                <h1>Edit!</h1>
                <Link to={`/company/${TAX_NUMBER}`}>
                    <Button onClick={this.editProfile} type="primary">
                        <span>
                            Save
                        </span>
                    </Button>
                </Link>
            </>
        )
    };
}
// const Edit = (props) => {
//     editProfile() {
//         console.log('!!!');
//     }
//     return(
//         <>
//             <h1>Edit!</h1>
//             <Link to={`/company/${TAX_NUMBER}`}>
//                 <Button onClick={editProfile} type="primary">
//                     <span>
//                         Save
//                     </span>
//                 </Button>
//             </Link>
//         </>
//     )
// }

export default class Company extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    componentDidUpdate() {
        console.log(this.props);
    }
    render() {
        return(
            <Switch>
                <Route exact path="/company/search" component={Search} />
                <Route exact path="/company/saved" component={Saved} />
                <Route exact path={`/company/edit`}  component={Edit} />
                <Route exact path={`/company/:${TAX_NUMBER}`} component={Page} />
            </Switch>
        )
    }
}