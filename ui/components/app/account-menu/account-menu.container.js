import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import {
  toggleAccountMenu,
  showAccountDetail,
  lockMetamask,
  hideWarning,
  autoDetectAccounts,
} from '../../../store/actions';
import {
  getAddressConnectedSubjectMap,
  getMetaMaskAccountsOrdered,
  getMetaMaskKeyrings,
  getOriginOfCurrentTab,
  getSelectedAddress,
} from '../../../selectors';
import AccountMenu from './account-menu.component';

/**
 * The min amount of accounts to show search field
 */
const SHOW_SEARCH_ACCOUNTS_MIN_COUNT = 5;

function mapStateToProps(state) {
  const {
    appState,
    metamask: { isAccountMenuOpen },
  } = state;
  const { isLoading } = appState;

  const accounts = getMetaMaskAccountsOrdered(state);
  const origin = getOriginOfCurrentTab(state);
  const selectedAddress = getSelectedAddress(state);

  return {
    isAccountMenuOpen,
    addressConnectedSubjectMap: getAddressConnectedSubjectMap(state),
    isLoading,
    originOfCurrentTab: origin,
    selectedAddress,
    keyrings: getMetaMaskKeyrings(state),
    accounts,
    shouldShowAccountsSearch: accounts.length >= SHOW_SEARCH_ACCOUNTS_MIN_COUNT,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleAccountMenu: () => dispatch(toggleAccountMenu()),
    showAccountDetail: (address) => {
      dispatch(showAccountDetail(address));
      dispatch(toggleAccountMenu());
    },
    autoDetectAccounts: () => {
      return dispatch(autoDetectAccounts());
    },
    lockMetamask: () => {
      dispatch(lockMetamask());
      dispatch(hideWarning());
      dispatch(toggleAccountMenu());
    },
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AccountMenu);
