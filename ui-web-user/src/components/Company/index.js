import React            from 'react';

import { 
    Button, 
    Input,
    Select
} from 'antd';

import { 
    Switch, 
    Route, 
    Link, 
    Redirect, 
    useHistory 
} from 'react-router-dom';

import { 
    observer 
} from 'mobx-react';

import companyStore     from '../../stores/companyStore';
import authStore        from '../../stores/authStore';

import {
    COMPANY_LEGAL_TYPE_OOO,
    COMPANY_LEGAL_TYPE_IP,
} from '../../constants/company.legal.types.constants';

const { Option } = Select;

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
const Page = observer(class Page extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    async componentDidMount() {
        await companyStore.getCompany({user_id: authStore.user_id});
    }
    async componentWillUnmount() {
        await companyStore.resetCompany();
    }
    render() {
        if (window.location.pathname != `/company/${companyStore.profile.tax_id}`) {
            return <Redirect to={`/company/${companyStore.profile.tax_id}`} />;
        } else {
            return(
                <>
                    <h1>
                        <span className="description">
                            {companyStore.profile.legal_type} "{companyStore.profile.company_name}"
                        </span>
                        <br />
                        <span className="description">
                            ИНН: {companyStore.profile.tax_id}
                        </span>
                    </h1>
                    {/* <h1>id страницы: {this.props.match.params.tax_id}</h1> */}
                    <h1>id страницы: {companyStore.profile.tax_id}</h1>
                    <Link to={`/company/edit`} >
                        <Button type="primary">
                            <span>
                                Редактировать
                            </span>
                        </Button>
                    </Link>
                </>
            )
        }
    }
})
const Edit = observer(class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    state = {
        legal_type: companyStore.profile.legal_type || null,
        company_name: companyStore.profile.company_name || null,
        tax_id: companyStore.profile.tax_id || null,
    }
    async componentDidMount() {
        await companyStore.getCompany({user_id: authStore.user_id});

        this.setState({
            legal_type: companyStore.profile.legal_type,
            company_name: companyStore.profile.company_name,
            tax_id: companyStore.profile.tax_id,
        });
    }
    async componentWillUnmount() {
        await companyStore.resetCompany();
    }
    onChangeLegalType = async (value) => {
        this.setState({
            legal_type: value
        });
    }
    onChangeCompanyName = async (event) => {
        await this.setState({
            company_name: event.target.value
        });
    }
    onChangeTaxNumber = async (event) => {
        await this.setState({
            tax_id: event.target.value
        });
    }
    editProfile = async () => {
        companyStore.setProfileLegalType(this.state.legal_type);
        companyStore.setProfileName(this.state.company_name);
        companyStore.setProfileTaxNumber(this.state.tax_id);
        companyStore.editProfile();
    }
    render() {
        return(
            <>
                <h1>Edit!</h1>
                <Select placeholder="Тип компании" style={{ width: 120 }} value={this.state.legal_type} onChange={this.onChangeLegalType}>
                    <Option value={COMPANY_LEGAL_TYPE_OOO}>ООО</Option>
                    <Option value={COMPANY_LEGAL_TYPE_IP}>ИП</Option>
                </Select>
                <Input placeholder="Название компании" name="company_name" value={this.state.company_name} onChange={this.onChangeCompanyName} />
                <Input placeholder="ИНН" name="tax_id" value={this.state.tax_id} onChange={this.onChangeTaxNumber} />
                <Link to={`/company/${companyStore.profile.tax_id}`}>
                    <Button onClick={this.editProfile} type="primary">
                        <span>
                            Сохранить
                        </span>
                    </Button>
                </Link>
            </>
        )
    };
});

export default class Company extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return(
            <Switch>
                <Route exact path="/company/search" component={Search} />
                <Route exact path="/company/saved" component={Saved} />
                <Route exact path={`/company/edit`}  component={Edit} />
                <Route exact path={`/company/:tax_id`} component={Page} />
            </Switch>
        )
    }
}