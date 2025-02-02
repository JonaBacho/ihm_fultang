from accounting.models import AccountState

immobilized_actives_prefixes = [str(i) for i in range(20, 29)]
circulant_actives_prefixes = [str(i) for i in range(30, 50)]
stable_resource_indexes = [str(i) for i in range(10, 20)]
treasury_indexes = [str(i) for i in range(50,60)]
circulant_passives_prefixes = [str(i) for i in range(40, 50)]
equity_indexes = [str(i) for i in range(10, 16)]
financial_debt_prefixes = [str(i) for i in range (16, 20)]
stock_indexes = {str(i) for i in range(30, 40)}

charges_prefixes = ['6']
products_prefixes = ['7']
sales_figure_prefixes = ['70', '71', '72', '73']
sold_goods_prefixes = ['60', '61', '62','63']
working_charges_prefixes = ['64', '65', '66', '67']

depreciation_allocations_prefixes = ['68']
provision_allocations_prefixes = ['69']
financial_charges_prefixes = ['67']
taxes_prefixes = ['89']

operating_cash_inflows_prefixes = ['70', '71']
operating_cash_outflows_prefixes = ['60', '61', '62', '63', '64', '65', '66']

investment_cash_inflows_prefixes = ['82']
investment_cash_outflows_prefixes = ['20', '21', '22', '23', '24', '25']

financing_cash_inflows_prefixes = ['16', '17']
financing_cash_outflows_prefixes = ['16', '17', '46']

dividends_paid_prefixes = ['46']
net_income_prefixes = ['13']

commitments_received_prefixes = ['90']
commitments_given_prefixes = ['91']


def calculate_balance(prefixes):
    balance = {}
    total = {"soldeReel": 0, "soldePrevu": 0}
    for prefix in prefixes:
        balance[prefix] = {"soldeReel": 0, "soldePrevu": 0}
        account_states = AccountState.objects.filter(account__number__startswith=prefix)
        for state in account_states:
            balance[prefix]["soldeReel"] += state.soldeReel
            balance[prefix]["soldePrevu"] += state.soldePrevu
            total['soldeReel'] += state.soldeReel
            total['soldePrevu'] += state.soldePrevu
    balance["total"] = total
    return balance

def calculate_treasury(prefixes, type):
    treasury = {}
    total = {"soldeReel": 0, "soldePrevu": 0}
    for prefix in prefixes:
        treasury[prefix] = {"soldeReel": 0, "soldePrevu": 0}
        if type == "active":
            account_states = AccountState.objects.filter(account__number__startswith=prefix).filter(account__status="credit")
        else:
            account_states = AccountState.objects.filter(account__number__startswith=prefix).filter(account__status="debit")
        for state in account_states:
            treasury[prefix]["soldeReel"] += state.soldeReel
            treasury[prefix]["soldePrevu"] += state.soldePrevu
            total['soldeReel'] += state.soldeReel
            total['soldePrevu'] += state.soldePrevu
    treasury['total'] = total
    return treasury

def calculate_circulant_balance(prefixes, type):
    balance = {}
    total = {"soldeReel": 0, "soldePrevu": 0}
    for prefix in prefixes:
        balance[prefix] = {"soldeReel": 0, "soldePrevu": 0}
        if type == "passive":
            account_states = AccountState.objects.filter(account__number__startswith=prefix).filter(account__status="creances")
        else:
            account_states = AccountState.objects.filter(account__number__startswith=prefix).filter(account__status="null")
        for state in account_states:
            balance[prefix]["soldeReel"] += state.soldeReel
            balance[prefix]["soldePrevu"] += state.soldePrevu
            total['soldeReel'] += state.soldeReel
            total['soldePrevu'] += state.soldePrevu
    balance['total'] = total
    return balance