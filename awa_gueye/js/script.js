/* ===================================
   FICHIER JAVASCRIPT - AgroValue SA
   Auteur: Votre Nom
   Date: Décembre 2025
   Description: Gestion du formulaire de contact avec validation dynamique
   =================================== */

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // Récupération des éléments du formulaire
    const form = document.getElementById('contactForm');
    
    // Vérifier si on est sur la page de contact
    if (!form) {
        return; // Si le formulaire n'existe pas, ne rien faire
    }

    const nomInput = document.getElementById('nom');
    const emailInput = document.getElementById('email');
    const telephoneInput = document.getElementById('telephone');
    const sujetSelect = document.getElementById('sujet');
    const messageTextarea = document.getElementById('message');
    
    // Champs conditionnels
    const fieldDomaine = document.getElementById('field-domaine');
    const fieldTicket = document.getElementById('field-ticket');
    const fieldUrgence = document.getElementById('field-urgence');
    const fieldDateIncident = document.getElementById('field-date-incident');
    
    const domaineInput = document.getElementById('domaine');
    const ticketInput = document.getElementById('ticket');
    const urgenceSelect = document.getElementById('urgence');
    const dateIncidentInput = document.getElementById('dateIncident');

    // Messages d'erreur
    const nomError = document.getElementById('nom-error');
    const emailError = document.getElementById('email-error');
    const telephoneError = document.getElementById('telephone-error');
    const sujetError = document.getElementById('sujet-error');
    const messageError = document.getElementById('message-error');
    const typeDemandeError = document.getElementById('typeDemande-error');

    /* ========================================
       A) AFFICHAGE/MASQUAGE DE CHAMPS CONDITIONNELS
       ======================================== */
    
    /**
     * Fonction pour gérer l'affichage des champs conditionnels
     * selon le sujet sélectionné
     */
    function gererChampsConditionnels() {
        // Récupérer la valeur sélectionnée
        const sujetValue = sujetSelect.value;

        // Masquer tous les champs conditionnels par défaut
        fieldDomaine.style.display = 'none';
        fieldTicket.style.display = 'none';
        fieldUrgence.style.display = 'none';
        fieldDateIncident.style.display = 'none';

        // Retirer l'attribut required de tous les champs conditionnels
        domaineInput.removeAttribute('required');
        ticketInput.removeAttribute('required');
        urgenceSelect.removeAttribute('required');
        dateIncidentInput.removeAttribute('required');

        // Réinitialiser les valeurs des champs conditionnels
        domaineInput.value = '';
        ticketInput.value = '';
        urgenceSelect.value = '';
        dateIncidentInput.value = '';

        // Afficher les champs appropriés selon le sujet
        switch(sujetValue) {
            case 'information':
                // Demande d'information : afficher le champ "Domaine d'intérêt"
                fieldDomaine.style.display = 'block';
                domaineInput.setAttribute('required', 'required');
                break;
                
            case 'support':
                // Support technique : afficher "Numéro de ticket" et "Urgence"
                fieldTicket.style.display = 'block';
                fieldUrgence.style.display = 'block';
                ticketInput.setAttribute('required', 'required');
                urgenceSelect.setAttribute('required', 'required');
                break;
                
            case 'reclamation':
                // Réclamation : afficher "Date de l'incident"
                fieldDateIncident.style.display = 'block';
                dateIncidentInput.setAttribute('required', 'required');
                break;
                
            case 'autre':
                // Autre : aucun champ supplémentaire
                break;
        }
    }

    // Écouter les changements sur le select "Sujet"
    sujetSelect.addEventListener('change', gererChampsConditionnels);

    /* ========================================
       B) VALIDATION EN TEMPS RÉEL
       ======================================== */

    /**
     * Fonction pour valider le nom
     * Doit contenir au moins 3 caractères
     */
    function validerNom() {
        const nom = nomInput.value.trim();
        
        if (nom.length === 0) {
            nomError.textContent = 'Le nom est obligatoire.';
            nomInput.classList.add('error');
            return false;
        } else if (nom.length < 3) {
            nomError.textContent = 'Le nom doit contenir au moins 3 caractères.';
            nomInput.classList.add('error');
            return false;
        } else {
            nomError.textContent = '';
            nomInput.classList.remove('error');
            return true;
        }
    }

    /**
     * Fonction pour valider l'email
     * Doit contenir @ et un point
     */
    function validerEmail() {
        const email = emailInput.value.trim();
        
        if (email.length === 0) {
            emailError.textContent = 'L\'email est obligatoire.';
            emailInput.classList.add('error');
            return false;
        }
        
        // Vérifier la présence de @ et d'un point après le @
        const positionAt = email.indexOf('@');
        const positionPoint = email.lastIndexOf('.');
        
        if (positionAt === -1 || positionPoint === -1 || positionPoint < positionAt) {
            emailError.textContent = 'L\'email doit contenir @ et un point après le @.';
            emailInput.classList.add('error');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('error');
            return true;
        }
    }

    /**
     * Fonction pour valider le téléphone
     * Doit contenir uniquement des chiffres (10 minimum)
     */
    function validerTelephone() {
        const telephone = telephoneInput.value.trim();
        
        if (telephone.length === 0) {
            telephoneError.textContent = 'Le téléphone est obligatoire.';
            telephoneInput.classList.add('error');
            return false;
        }
        
        // Vérifier que le téléphone contient uniquement des chiffres
        const regexChiffres = /^[0-9]+$/;
        
        if (!regexChiffres.test(telephone)) {
            telephoneError.textContent = 'Le téléphone doit contenir uniquement des chiffres.';
            telephoneInput.classList.add('error');
            return false;
        } else if (telephone.length < 10) {
            telephoneError.textContent = 'Le téléphone doit contenir au moins 10 chiffres.';
            telephoneInput.classList.add('error');
            return false;
        } else {
            telephoneError.textContent = '';
            telephoneInput.classList.remove('error');
            return true;
        }
    }

    /**
     * Fonction pour valider le sujet
     */
    function validerSujet() {
        if (sujetSelect.value === '') {
            sujetError.textContent = 'Veuillez sélectionner un sujet.';
            sujetSelect.classList.add('error');
            return false;
        } else {
            sujetError.textContent = '';
            sujetSelect.classList.remove('error');
            return true;
        }
    }

    /**
     * Fonction pour valider le message
     */
    function validerMessage() {
        const message = messageTextarea.value.trim();
        
        if (message.length === 0) {
            messageError.textContent = 'Le message est obligatoire.';
            messageTextarea.classList.add('error');
            return false;
        } else {
            messageError.textContent = '';
            messageTextarea.classList.remove('error');
            return true;
        }
    }

    /**
     * Fonction pour valider le type de demande (radio buttons)
     */
    function validerTypeDemande() {
        const typeDemande = document.querySelector('input[name="typeDemande"]:checked');
        
        if (!typeDemande) {
            typeDemandeError.textContent = 'Veuillez sélectionner un type de demande.';
            return false;
        } else {
            typeDemandeError.textContent = '';
            return true;
        }
    }

    /**
     * Fonction pour valider les champs conditionnels
     */
    function validerChampsConditionnels() {
        const sujetValue = sujetSelect.value;
        let isValid = true;

        // Vérifier selon le sujet sélectionné
        if (sujetValue === 'information') {
            const domaine = domaineInput.value.trim();
            const domaineError = document.getElementById('domaine-error');
            
            if (domaine.length === 0) {
                domaineError.textContent = 'Le domaine d\'intérêt est obligatoire.';
                domaineInput.classList.add('error');
                isValid = false;
            } else {
                domaineError.textContent = '';
                domaineInput.classList.remove('error');
            }
        } else if (sujetValue === 'support') {
            const ticket = ticketInput.value.trim();
            const ticketError = document.getElementById('ticket-error');
            
            if (ticket.length === 0) {
                ticketError.textContent = 'Le numéro de ticket est obligatoire.';
                ticketInput.classList.add('error');
                isValid = false;
            } else {
                ticketError.textContent = '';
                ticketInput.classList.remove('error');
            }

            const urgenceError = document.getElementById('urgence-error');
            if (urgenceSelect.value === '') {
                urgenceError.textContent = 'Veuillez sélectionner un niveau d\'urgence.';
                urgenceSelect.classList.add('error');
                isValid = false;
            } else {
                urgenceError.textContent = '';
                urgenceSelect.classList.remove('error');
            }
        } else if (sujetValue === 'reclamation') {
            const dateIncident = dateIncidentInput.value;
            const dateIncidentError = document.getElementById('dateIncident-error');
            
            if (dateIncident === '') {
                dateIncidentError.textContent = 'La date de l\'incident est obligatoire.';
                dateIncidentInput.classList.add('error');
                isValid = false;
            } else {
                dateIncidentError.textContent = '';
                dateIncidentInput.classList.remove('error');
            }
        }

        return isValid;
    }

    // Ajouter des écouteurs d'événements pour la validation en temps réel
    nomInput.addEventListener('blur', validerNom);
    nomInput.addEventListener('input', validerNom);
    
    emailInput.addEventListener('blur', validerEmail);
    emailInput.addEventListener('input', validerEmail);
    
    telephoneInput.addEventListener('blur', validerTelephone);
    telephoneInput.addEventListener('input', validerTelephone);
    
    sujetSelect.addEventListener('change', validerSujet);
    
    messageTextarea.addEventListener('blur', validerMessage);

    /* ========================================
       C) VALIDATION À LA SOUMISSION
       ======================================== */

    /**
     * Fonction principale de validation du formulaire
     */
    form.addEventListener('submit', function(e) {
        // Empêcher la soumission par défaut
        e.preventDefault();

        console.log('Tentative de soumission du formulaire...');

        // Valider tous les champs
        const nomValide = validerNom();
        const emailValide = validerEmail();
        const telephoneValide = validerTelephone();
        const sujetValide = validerSujet();
        const messageValide = validerMessage();
        const typeDemandeValide = validerTypeDemande();
        const champsConditionnelsValides = validerChampsConditionnels();

        // Vérifier si tous les champs sont valides
        const formulaireValide = nomValide && emailValide && telephoneValide && 
                                 sujetValide && messageValide && typeDemandeValide && 
                                 champsConditionnelsValides;

        if (!formulaireValide) {
            // Si le formulaire n'est pas valide, afficher un message d'erreur global
            alert('Veuillez corriger les erreurs avant de soumettre le formulaire.');
            console.log('Formulaire invalide');
            return false;
        }

        console.log('Formulaire valide, préparation du récapitulatif...');

        // Si tout est valide, afficher le message de succès et le récapitulatif
        afficherRecapitulatif();
        
        return false; // Empêcher la vraie soumission
    });

    /**
     * Fonction pour afficher le récapitulatif des données saisies
     */
    function afficherRecapitulatif() {
        // Récupérer toutes les valeurs du formulaire
        const nom = nomInput.value.trim();
        const email = emailInput.value.trim();
        const telephone = telephoneInput.value.trim();
        const sujet = sujetSelect.options[sujetSelect.selectedIndex].text;
        const message = messageTextarea.value.trim();
        const typeDemande = document.querySelector('input[name="typeDemande"]:checked').value;

        // Construire le HTML du récapitulatif
        let recapHTML = '<h4>Récapitulatif de votre demande :</h4>';
        recapHTML += '<p><strong>Nom :</strong> ' + nom + '</p>';
        recapHTML += '<p><strong>Email :</strong> ' + email + '</p>';
        recapHTML += '<p><strong>Téléphone :</strong> ' + telephone + '</p>';
        recapHTML += '<p><strong>Sujet :</strong> ' + sujet + '</p>';
        recapHTML += '<p><strong>Type de demande :</strong> ' + typeDemande + '</p>';

        // Ajouter les champs conditionnels s'ils sont visibles
        const sujetValue = sujetSelect.value;
        
        if (sujetValue === 'information') {
            const domaine = domaineInput.value.trim();
            recapHTML += '<p><strong>Domaine d\'intérêt :</strong> ' + domaine + '</p>';
        } else if (sujetValue === 'support') {
            const ticket = ticketInput.value.trim();
            const urgence = urgenceSelect.options[urgenceSelect.selectedIndex].text;
            recapHTML += '<p><strong>Numéro de ticket :</strong> ' + ticket + '</p>';
            recapHTML += '<p><strong>Urgence :</strong> ' + urgence + '</p>';
        } else if (sujetValue === 'reclamation') {
            const dateIncident = dateIncidentInput.value;
            recapHTML += '<p><strong>Date de l\'incident :</strong> ' + dateIncident + '</p>';
        }

        recapHTML += '<p><strong>Message :</strong> ' + message + '</p>';

        // Afficher le récapitulatif
        document.getElementById('recapitulatif').innerHTML = recapHTML;
        
        // Masquer le formulaire et afficher le message de succès
        form.style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';

        // Faire défiler vers le message de succès
        document.getElementById('successMessage').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });

        console.log('Récapitulatif affiché avec succès');
    }

    // Message de confirmation dans la console
    console.log('Script JavaScript chargé avec succès pour AgroValue SA');
});