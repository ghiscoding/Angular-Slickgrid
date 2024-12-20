export class TranslateServiceStub {
  currentLang = 'en';

  use(locale: string) {
    return new Promise((resolve) => resolve((this.currentLang = locale)));
  }

  instant(translationKey: string): string {
    let output = translationKey;
    switch (translationKey) {
      case 'ALL_SELECTED':
        output = this.currentLang === 'en' ? 'All Selected' : 'Tout sélectionnés';
        break;
      case 'ALL_X_RECORDS_SELECTED':
        output = this.currentLang === 'en' ? 'All {{x}} records selected' : 'Sur tous les {{x}} éléments sélectionnés';
        break;
      case 'APPLY_MASS_UPDATE':
        output = this.currentLang === 'en' ? 'Apply Mass Update' : 'Mettre à jour en masse';
        break;
      case 'APPLY_TO_SELECTION':
        output = this.currentLang === 'en' ? 'Update Selection' : 'Mettre à jour la sélection';
        break;
      case 'CANCEL':
        output = this.currentLang === 'en' ? 'Cancel' : 'Annuler';
        break;
      case 'CLEAR_ALL_GROUPING':
        output = this.currentLang === 'en' ? 'Clear all Grouping' : 'Supprimer tous les groupes';
        break;
      case 'CLEAR_ALL_FILTERS':
        output = this.currentLang === 'en' ? 'Clear all Filters' : 'Supprimer tous les filtres';
        break;
      case 'CLEAR_ALL_SORTING':
        output = this.currentLang === 'en' ? 'Clear all Sorting' : 'Supprimer tous les tris';
        break;
      case 'CLEAR_PINNING':
        output = this.currentLang === 'en' ? 'Unfreeze Columns/Rows' : 'Dégeler les colonnes/rangées';
        break;
      case 'COLUMNS':
        output = this.currentLang === 'en' ? 'Columns' : 'Colonnes';
        break;
      case 'COMMANDS':
        output = this.currentLang === 'en' ? 'Commands' : 'Commandes';
        break;
      case 'COLLAPSE_ALL_GROUPS':
        output = this.currentLang === 'en' ? 'Collapse all Groups' : 'Réduire tous les groupes';
        break;
      case 'CONTAINS':
        output = this.currentLang === 'en' ? 'Contains' : 'Contient';
        break;
      case 'COPY':
        output = this.currentLang === 'en' ? 'Copy' : 'Copier';
        break;
      case 'DURATION':
        output = this.currentLang === 'en' ? 'Duration' : 'Durée';
        break;
      case 'EMPTY_DATA_WARNING_MESSAGE':
        output = this.currentLang === 'en' ? 'No data to display.' : 'Aucune donnée à afficher.';
        break;
      case 'ENDS_WITH':
        output = this.currentLang === 'en' ? 'Ends With' : 'Se termine par';
        break;
      case 'EQUALS':
        output = this.currentLang === 'en' ? 'Equals' : 'Égale';
        break;
      case 'EQUAL_TO':
        output = this.currentLang === 'en' ? 'Equal to' : 'Égal à';
        break;
      case 'EXPAND_ALL_GROUPS':
        output = this.currentLang === 'en' ? 'Expand all Groups' : 'Étendre tous les groupes';
        break;
      case 'EXPORT_TO_CSV':
        output = this.currentLang === 'en' ? 'Export in CSV format' : 'Exporter en format CSV';
        break;
      case 'EXPORT_TO_EXCEL':
        output = this.currentLang === 'en' ? 'Export to Excel' : 'Exporter vers Excel';
        break;
      case 'EXPORT_TO_TAB_DELIMITED':
        output =
          this.currentLang === 'en'
            ? 'Export in Text format (Tab delimited)'
            : 'Exporter en format texte (délimité par tabulation)';
        break;
      case 'EXPORT_TO_TEXT_FORMAT':
        output = this.currentLang === 'en' ? 'Export in Text format' : 'Exporter en format texte';
        break;
      case 'FEMALE':
        output = this.currentLang === 'en' ? 'Female' : 'Femme';
        break;
      case 'FIRST_NAME':
        output = this.currentLang === 'en' ? 'First Name' : 'Prénom';
        break;
      case 'FORCE_FIT_COLUMNS':
        output = this.currentLang === 'en' ? 'Force fit columns' : 'Ajustement forcé des colonnes';
        break;
      case 'FREEZE_COLUMNS':
        output = this.currentLang === 'en' ? 'Freeze Columns' : 'Geler les colonnes';
        break;
      case 'GREATER_THAN':
        output = this.currentLang === 'en' ? 'Greater than' : 'Plus grand que';
        break;
      case 'GREATER_THAN_OR_EQUAL_TO':
        output = this.currentLang === 'en' ? 'Greater than or equal to' : 'Plus grand ou égal à';
        break;
      case 'GROUP_BY':
        output = this.currentLang === 'en' ? 'Grouped By' : 'Groupé par';
        break;
      case 'GROUP_NAME':
        output = this.currentLang === 'en' ? 'Group Name' : 'Nom du Groupe';
        break;
      case 'HELLO':
        output = this.currentLang === 'en' ? 'Hello' : 'Bonjour';
        break;
      case 'HELP':
        output = this.currentLang === 'en' ? 'Help' : 'Aide';
        break;
      case 'HIDE_COLUMN':
        output = this.currentLang === 'en' ? 'Hide Column' : 'Cacher la colonne';
        break;
      case 'LAST_NAME':
        output = this.currentLang === 'en' ? 'Last Name' : 'Nom de famille';
        break;
      case 'LAST_UPDATE':
        output = this.currentLang === 'en' ? 'Last Update' : 'Dernière mise à jour';
        break;
      case 'LESS_THAN':
        output = this.currentLang === 'en' ? 'Less than or equal to' : 'Plus petit que';
        break;
      case 'LESS_THAN_OR_EQUAL_TO':
        output = this.currentLang === 'en' ? 'Less than or equal to' : 'Plus petit ou égal à';
        break;
      case 'MALE':
        output = this.currentLang === 'en' ? 'Male' : 'Mâle';
        break;
      case 'ITEMS':
        output = this.currentLang === 'en' ? 'items' : 'éléments';
        break;
      case 'ITEMS_PER_PAGE':
        output = this.currentLang === 'en' ? 'items per page' : 'éléments par page';
        break;
      case 'NOT_EQUAL_TO':
        output = this.currentLang === 'en' ? 'Not equal to' : 'Non égal à';
        break;
      case 'OF':
        output = this.currentLang === 'en' ? 'of' : 'de';
        break;
      case 'OK':
        output = this.currentLang === 'en' ? 'OK' : 'Terminé';
        break;
      case 'OPTIONS_LIST':
        output = this.currentLang === 'en' ? 'Options List' : "Liste d'options";
        break;
      case 'OTHER':
        output = this.currentLang === 'en' ? 'Other' : 'Autre';
        break;
      case 'PAGE':
        output = this.currentLang === 'en' ? 'Page' : 'Page';
        break;
      case 'REFRESH_DATASET':
        output = this.currentLang === 'en' ? 'Refresh Dataset' : 'Rafraîchir les données';
        break;
      case 'REMOVE_FILTER':
        output = this.currentLang === 'en' ? 'Remove Filter' : 'Supprimer le filtre';
        break;
      case 'REMOVE_SORT':
        output = this.currentLang === 'en' ? 'Remove Sort' : 'Supprimer le tri';
        break;
      case 'SORT_ASCENDING':
        output = this.currentLang === 'en' ? 'Sort Ascending' : 'Trier par ordre croissant';
        break;
      case 'SORT_DESCENDING':
        output = this.currentLang === 'en' ? 'Sort Descending' : 'Trier par ordre décroissant';
        break;
      case 'SAVE':
        output = this.currentLang === 'en' ? 'Save' : 'Sauvegarder';
        break;
      case 'STARTS_WITH':
        output = this.currentLang === 'en' ? 'Starts With' : 'Commence par';
        break;
      case 'SYNCHRONOUS_RESIZE':
        output = this.currentLang === 'en' ? 'Synchronous resize' : 'Redimension synchrone';
        break;
      case 'TITLE':
        output = this.currentLang === 'en' ? 'Title' : 'Titre';
        break;
      case 'TOGGLE_FILTER_ROW':
        output = this.currentLang === 'en' ? 'Toggle Filter Row' : 'Basculer la ligne des filtres';
        break;
      case 'TOGGLE_PRE_HEADER_ROW':
        output = this.currentLang === 'en' ? 'Toggle Pre-Header Row' : 'Basculer la ligne de pré-en-tête';
        break;
      case 'TRUE':
        output = this.currentLang === 'en' ? 'True' : 'Vrai';
        break;
      case 'USER_PROFILE':
        output = this.currentLang === 'en' ? 'User Profile' : `Profile d'usager`;
        break;
      case 'COMPANY_PROFILE':
        output = this.currentLang === 'en' ? 'Company Profile' : `Profile de compagnie`;
        break;
      case 'SALES':
        output = this.currentLang === 'en' ? 'Sales' : 'Ventes';
        break;
      case 'SALES_REP':
        output = this.currentLang === 'en' ? 'Sales Rep.' : 'Représentant des ventes';
        break;
      case 'SELECT_ALL':
        output = this.currentLang === 'en' ? 'Select All' : 'Sélectionner tout';
        break;
      case 'FINANCE_MANAGER':
        output = this.currentLang === 'en' ? 'Finance Manager' : 'Responsable des finances';
        break;
      case 'HUMAN_RESOURCES':
        output = this.currentLang === 'en' ? 'Human Resources' : 'Ressources humaines';
        break;
      case 'IT_ADMIN':
        output = this.currentLang === 'en' ? 'IT Admin' : 'Administrateur IT';
        break;
      case 'DEVELOPER':
        output = this.currentLang === 'en' ? 'Developer' : 'Développeur';
        break;
      case 'X_OF_Y_SELECTED':
        output = this.currentLang === 'en' ? '# of % selected' : '# de % sélectionnés';
        break;
      case 'X_OF_Y_MASS_SELECTED':
        output = this.currentLang === 'en' ? '{{x}} of {{y}} records selected' : '{{x}} de {{y}} éléments sélectionnés';
        break;
    }
    return output;
  }
}
