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

operating_cash_inflows_prefixes = ['70', '71', '72', '73']
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
    items = []
    for prefix in prefixes:
        item = {"accountNo":prefix, "label":ACCOUNTS_MAPPING.get(prefix, "Copte incomu"), "soldeReel": 0, "soldePrevu": 0}
        # balance[prefix] = {"soldeReel": 0, "soldePrevu": 0}
        account_states = AccountState.objects.filter(account__number__startswith=prefix)
        for state in account_states:
            item["soldeReel"] += state.soldeReel
            item["soldePrevu"] += state.soldePrevu
            total['soldeReel'] += state.soldeReel
            total['soldePrevu'] += state.soldePrevu
        items.append(item)
    balance["items"] = items
    balance["total"] = total
    return balance

def calculate_treasury(prefixes, type):
    treasury = {}
    total = {"soldeReel": 0, "soldePrevu": 0}
    items = []
    for prefix in prefixes:
        item = {"accountNo":prefix, "label":ACCOUNTS_MAPPING.get(prefix, "Copte incomu"), "soldeReel": 0, "soldePrevu": 0}
        # treasury[prefix] = {"soldeReel": 0, "soldePrevu": 0}
        if type == "active":
            account_states = AccountState.objects.filter(account__number__startswith=prefix).filter(account__status="credit")
        else:
            account_states = AccountState.objects.filter(account__number__startswith=prefix).filter(account__status="debit")
        for state in account_states:
            item["soldeReel"] += state.soldeReel
            item["soldePrevu"] += state.soldePrevu
            total['soldeReel'] += state.soldeReel
            total['soldePrevu'] += state.soldePrevu
        items.append(item)
    treasury['total'] = total
    return treasury        

def calculate_circulant_balance(prefixes, type=None):
    balance = {}
    total = {"soldeReel": 0, "soldePrevu": 0}
    items = []
    for prefix in prefixes:
        item = {"accountNo":prefix, "label":ACCOUNTS_MAPPING.get(prefix, "Copte incomu"), "soldeReel": 0, "soldePrevu": 0}
        if type == "passive":
            account_states = AccountState.objects.filter(account__number__startswith=prefix).filter(account__status="creances")
        else:
            account_states = AccountState.objects.filter(account__number__startswith=prefix).filter(account__status="null")
        for state in account_states:
            item["soldeReel"] += state.soldeReel
            item["soldePrevu"] += state.soldePrevu
            total['soldeReel'] += state.soldeReel
            total['soldePrevu'] += state.soldePrevu
        items.append(item)
    balance['total'] = total
    return balance

ACCOUNTS_MAPPING = {
    "10": "Capital",
    "11": "Primes d’émission, de fusion, d’apport",
    "12": "Réserves",
    "13": "Report à nouveau",
    "14": "Résultat net de l'exercice",
    "15": "Subventions, provisions et autres fonds propres",
    "16": "Emprunts et dettes assimilées",
    "17": "Dettes de location acquisition",
    "18": "Comptes de liaison des établissements et sociétés en participation",
    "19": "Provisions pour risques et charges",

    "20": "Immobilisations incorporelles",
    "21": "Immobilisations corporelles",
    "22": "Immobilisations financières",
    "23": "Immobilisations en cours",
    "24": "Immobilisations affectées aux activités spécifiques",
    "25": "Amortissements des immobilisations",
    "26": "Provisions pour dépréciation des immobilisations",

    "30": "Matières premières et fournitures",
    "31": "Autres approvisionnements",
    "32": "En-cours de production de biens",
    "33": "En-cours de production de services",
    "34": "Produits intermédiaires et résiduels",
    "35": "Marchandises",
    "36": "Provisions pour dépréciation des stocks",

    "40": "Fournisseurs et comptes rattachés",
    "41": "Clients et comptes rattachés",
    "42": "Personnel et comptes rattachés",
    "43": "Organismes sociaux",
    "44": "État et collectivités publiques",
    "45": "Associés, comptes courants",
    "46": "Débiteurs et créditeurs divers",
    "47": "Comptes transitoires ou d’attente",
    "48": "Provisions pour dépréciation des comptes de tiers",
    "49": "Engagements par signature",

    "50": "Valeurs mobilières de placement",
    "51": "Banques et établissements financiers",
    "52": "Caisse",
    "53": "Instruments de trésorerie",
    "54": "Autres comptes financiers",
    "55": "Virements internes",
    "56": "Effets à payer",
    "57": "Effets à recevoir",
    "58": "Régularisation de trésorerie",
    "59": "Provisions pour dépréciation des comptes financiers",

    "60": "Achats",
    "61": "Services extérieurs",
    "62": "Autres charges externes",
    "63": "Impôts et taxes",
    "64": "Charges de personnel",
    "65": "Autres charges de gestion courante",
    "66": "Charges financières",
    "67": "Charges exceptionnelles",
    "68": "Dotations aux amortissements et provisions",
    "69": "Participation des travailleurs, impôts sur les bénéfices et assimilés",

    "70": "Ventes de marchandises, produits finis et services",
    "71": "Production stockée",
    "72": "Production immobilisée",
    "73": "Subventions d'exploitation",
    "74": "Autres produits de gestion courante",
    "75": "Produits financiers",
    "76": "Produits exceptionnels",
    "77": "Reprises sur amortissements et provisions",
    "78": "Transferts de charges",
    "79": "Dotations exceptionnelles",

    "80": "Comptes spéciaux",
    "81": "Résultats analytiques",
    "82": "Résultats analytiques par fonction",
    "83": "Comptes d’engagement",
    "84": "Comptes de variation de patrimoine",
    "85": "Comptes de contrepartie des engagements",
    "86": "Comptes de répartition",
    "87": "Comptes d’ordre",
    "88": "Comptes des opérations de clôture et de réouverture",
    "89": "Comptes d’affectation des résultats",

    "90": "Engagements donnés",
    "91": "Engagements reçus"
}
