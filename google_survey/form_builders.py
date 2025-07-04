from .google_form import GoogleForm

'''responses = {
            "assessmentName":doc.get("assessmentName", ""),
            "enteName":doc.get("enteName"),

            "tematica": doc.get("tematica", ""),
            "organizzazione": doc.get("organizzazione", ""),
            "formaGiuridica": doc.get("formaGiuridica", ""),
            "mission": doc.get("mission", ""),
            "areeInterne": doc.get("areeInterne", [""]) if doc.get("areeInterne") else [""],
            "progettiConclusi": doc.get("progettiConclusi", []),
            "progettiInCorso": doc.get("progettiInCorso", []),
            "areeCoinvolte": doc.get("areeCoinvolte", []),
            "grandezzaCampione": doc.get("grandezzaCampione", 0),
            "numeroRuoli": {
                "gestionale": doc.get("numeroRuoli", {}).get("gestionale", 0),
                "decisionale": doc.get("numeroRuoli", {}).get("decisionale", 0),
                "operativo": doc.get("numeroRuoli", {}).get("operativo", 0)
            }
        }
'''

def net_form_builder(responses):
    form = GoogleForm(
        title=f'Network Choesion Index_Analisi della rete {responses["assessmentName"]}',
        description=f"**Gentile partecipante,**\n\n"
                    f"La ricerca a cui ti chiediamo di partecipare rientra nel progetto {responses['assessmentName']}.\n"
                    f"La ricerca, denominata \"Network Cohesion Index\" ha l'obiettivo di costruire una lettura dinamica e multidimensionale "
                    f"delle potenzialità di sviluppo della rete di realtà coinvolte, rispetto all'obiettivo di {responses['tematica']}.\n\n"
                    f"Pertanto, ti chiediamo di rispondere offrendoci, per quanto possibile, una lettura approfondita di come l'ente di cui fai parte "
                    f"contribuisce alla rete di attori che si occupano di {responses['tematica']}, a partire dal ruolo da te ricoperto.\n\n"
                    f"I dati che offrirai non consentiranno mai di risalire all'identità dell'intervistato: verranno trattati ed elaborati esclusivamente "
                    f"dal team di DialogicaLab, e restituiti in forma aggregata e anonima.\n\n"
                    f"In relazione all'indirizzo mail dell'intervistato si specifica che non verrà da noi raccolto, ma rimarrà nella disponibilità della piattaforma Google.\n\n"
                    f"Per qualunque domanda in merito alla presente indagine puoi contattarci a questo indirizzo mail: ricerca@dialogica-lab.eu.\n\n"
                    f"Ti ringraziamo per la partecipazione.\n\n"
                    f"Lo Staff di ricerca di DialogicaLab."
    )
    tematica = responses['tematica']

    sections = {
        'requests': [
            {
                'createItem': {
                    'item': {
                        'title': 'Sezione Anagrafica',
                        'description': 'Informazioni di base sul partecipante e organizzazione',
                        'pageBreakItem': {},
                    },
                    'location': {
                        'index': 0
                    }
                }
            },
            {
                'createItem': {
                    'item': {
                        'title': 'Informazione sull\'ente di riferimento',
                        'description': 'In questa sezione, ti chiederemo alcune informazioni legate all\'ente a cui fai riferimento.',
                        'pageBreakItem': {},
                    },
                    'location': {
                        'index': 1
                    }
                }
            },
            {
                'createItem': {
                    'item': {
                        'title': 'Approfondimento per ruoli gestionali ',
                        'description': 'Domande specifiche per ruoli gestionali',
                        'pageBreakItem': {},
                    },
                    'location': {
                        'index': 2
                    }
                }
            },
            {
                'createItem': {
                    'item': {
                        'title': f'Attività, servizi, interventi della rete rispetto a {tematica}',
                        'description': 'In questa sezione ti chiediamo di descrivere, mettendoli in ordine di importanza, \
                        i tre principali progetti/interventi/servizi a favore dell\'obiettivo della rete che sono stati realizzati\
                            negli ultimi 3 anni e quelli che si intende realizzare nel prossimo biennio. In caso di non conoscenza, indicarlo nella risposta, esplicitandone la motivazione',
                        'pageBreakItem': {},
                    },
                    'location': {
                        'index': 3
                    }
                }
            },
            {
                'createItem': {
                    'item': {
                        'title': f'Interazioni nell\'ambito "{tematica}"',
                        'description': 'In questa sezione ti chiediamo di offrirci una lettura delle interazioni che il\
                              tuo ente ha avuto con gli altri enti della rete e del territorio più ampio, nell\'ambito di\
                                {tematica}',
                        'pageBreakItem': {},
                    },
                    'location': {
                        'index': 4
                    }
                }
            },
            {
                'createItem': {
                    'item': {
                        'title': f'Partecipazione a reti attive nell\'ambito "{tematica}" alla vita della comunità',
                        'description': 'In questa sezione si intende rilevare nello specifico quali collaborazioni sono\
                              o potrebbero essere strategiche per l\'obiettivo che persegue la rete.',
                        'pageBreakItem': {},
                    },
                    'location': {
                        'index': 5
                    }
                }
            }
        ]
    }

    # Aggiungiamo le sezioni e otteniamo gli ID
    section_ids = form.add_sections(sections)
    
    # Ora creiamo le domande con navigazione condizionale
    questions_requests = [
        # SEZIONE ANAGRAFICA
        {
            'createItem': {
                'item': {
                    'title': '1A. Età',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'choiceQuestion': {
                                'type': 'RADIO',
                                'options': [
                                    {'value': '18-25' },
                                    {'value': '26-29' },
                                    {'value': '30-35' },
                                    {'value': '36-40' },
                                    {'value': '41-49' },
                                    {'value': '50-59' },
                                    {'value': '60-69' },
                                    {'value': '> 70' }
                                ]
                            }
                        }
                    }
                },
                'location': {'index': 1}  # Dopo la prima sezione
            }
        },
        {
            'createItem': {
                'item': {
                    'title': '1B. Genere:',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'choiceQuestion': {
                                'type': 'RADIO',
                                'options': [
                                    {'value': 'M' },
                                    {'value': 'F' },
                                    {'value': 'Altro'}
                                ]
                            }
                        }
                    }
                },
                'location': {'index': 2}
            }
        },
        #SEZIONE 2) "Informazioni sull'ente di riferimento"
        {
            'createItem': {
                'item': {
                    'title': '2.A Nome dell\'ente di cui fai parte (risposta a scelta multipla\
                          tra quelle inserite nel text field dell\'amministratore)',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'choiceQuestion': {
                                'type': 'RADIO',
                                'options': [
                                    {
                                        'value': 'Gestionale',
                                        'goToSectionId': section_ids[1] if len(section_ids) > 0 else None  # Va alla sezione gestionale
                                    },
                                    {
                                        'value': 'Decisionale',
                                        'goToSectionId': section_ids[1] if len(section_ids) > 0 else None  # Va alla sezione gestionale
                                    },
                                    {
                                        'value': 'Operativo',
                                        'goToSectionId': section_ids[2] if len(section_ids) > 1 else None  # Va alla sezione operativa
                                    }
                                ]
                            }
                        }
                    }
                },
                'location': {'index': 4}
            }
        },
        {
            'createItem': {
                'item': {
                    'title': '2.B Tipologia organizzazione',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'choiceQuestion': {
                                'type': 'RADIO',
                                'options': [
                                    {'value': 'Ente Pubblico'},
                                    {'value': 'Istituzione scolastica o ente di formazione'},
                                    {'value': 'Organo studentesco'},
                                    {'value': 'Organizzazione di volontariato o associazione di promozione sociale'},
                                    {'value': 'Associazione o società sportiva'},
                                    {'value': 'Fondazione'},
                                    {'value': 'Cooperativa o Impresa Sociale'},
                                    {'value': 'Organizzazione Politica'},
                                    {'value': 'Impresa privata'},
                                    {'value': 'Organizzazione non governativa'},
                                    {'value': 'Azienda Consortile'},
                                    {'value': 'Aggregazione informale'},
                                ]
                            }
                        }
                    }
                },
                'location': {'index': 5}
            }
        },
        {
            'createItem': {
                'item': {
                    'title': '2.B Come valuti l\'efficacia della comunicazione interna?',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'choiceQuestion': {
                                'type': 'RADIO',
                                'options': [
                                    {
                                        'value': 'Gestionale',
                                        'goToSectionId': section_ids[1] if len(section_ids) > 0 else None  # Va alla sezione gestionale
                                    },
                                    {
                                        'value': 'Decisionale',
                                        'goToSectionId': section_ids[1] if len(section_ids) > 0 else None  # Va alla sezione gestionale
                                    },
                                    {
                                        'value': 'Operativo',
                                        'goToSectionId': section_ids[2] if len(section_ids) > 1 else None  # Va alla sezione operativa
                                    }
                                ]
                            }
                        }
                    }
                },
                'location': {'index': 6}  # Dopo la sezione gestionale
            }
        },
        {
            'createItem': {
                'item': {
                    'title': '2.C Con quale frequenza partecipi a riunioni strategiche?',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'textQuestion': {
                                'paragraph': True
                            }
                        }
                    }
                },
                'location': {'index': 7}
            }
        },
        
        # SEZIONE OPERATIVA (index 8 sarà dopo la terza sezione)
        {
            'createItem': {
                'item': {
                    'title': '4O. Descrivi le tue principali attività quotidiane:',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'textQuestion': {
                                'paragraph': True
                            }
                        }
                    }
                },
                'location': {'index': 9}  # Dopo la sezione operativa
            }
        },
        {
            'createItem': {
                'item': {
                    'title': '5O. Come valuti il supporto ricevuto dai tuoi superiori?',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'scaleQuestion': {
                                'low': 1,
                                'high': 5,
                                'lowLabel': 'Molto scarso',
                                'highLabel': 'Eccellente'
                            }
                        }
                    }
                },
                'location': {'index': 10}
            }
        },
        {
            'createItem': {
                'item': {
                    'title': '6O. Quali strumenti utilizzi principalmente nel tuo lavoro?',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'choiceQuestion': {
                                'type': 'CHECKBOX',
                                'options': [
                                    {'value': 'Software specifici'},
                                    {'value': 'Strumenti manuali'},
                                    {'value': 'Piattaforme digitali'},
                                    {'value': 'Altro'}
                                ]
                            }
                        }
                    }
                },
                'location': {'index': 11}
            }
        },
        
        # SEZIONE FINALE (index 12 sarà dopo la quarta sezione)
        {
            'createItem': {
                'item': {
                    'title': '7. Come valuti complessivamente l\'ambiente di lavoro?',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'scaleQuestion': {
                                'low': 1,
                                'high': 10,
                                'lowLabel': 'Molto negativo',
                                'highLabel': 'Eccellente'
                            }
                        }
                    }
                },
                'location': {'index': 13}  # Dopo la sezione finale
            }
        },
        {
            'createItem': {
                'item': {
                    'title': '8. Hai suggerimenti per migliorare l\'organizzazione?',
                    'questionItem': {
                        'question': {
                            'required': False,
                            'textQuestion': {
                                'paragraph': True
                            }
                        }
                    }
                },
                'location': {'index': 14}
            }
        }
    ]

    # Pulizia degli ID delle sezioni nulli e aggiunta delle domande
    cleaned_questions = []
    for question in questions_requests:
        question_item = question['createItem']['item'].get('questionItem', {})
        choice_question = question_item.get('question', {}).get('choiceQuestion', {})
        
        if 'options' in choice_question:
            for option in choice_question['options']:
                if 'goToSectionId' in option:
                    if option['goToSectionId'] is None:
                        # Rimuovi entrambe le chiavi se goToSectionId è None
                        del option['goToSectionId']
                    # In ogni caso, non inseriamo goToAction se non è necessario

        cleaned_questions.append(question)

    form.add_questions(cleaned_questions)
    form.update_question_map()
    
    return form

def create_conditional_navigation_form(responses):
    """
    Versione alternativa con logica di navigazione più semplificata
    """
    form = GoogleForm(
        title=responses["assessmentName"],
        description="Form con navigazione condizionale semplificata"
    )

    # Domande senza sezioni per maggiore semplicità
    questions_requests = [
        {
            'createItem': {
                'item': {
                    'title': 'Qual è il tuo ruolo?',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'choiceQuestion': {
                                'type': 'RADIO',
                                'options': [
                                    {
                                        'value': 'Gestionale',
                                        'goToAction': 'CONTINUE'  # Continua alla prossima domanda
                                    },
                                    {
                                        'value': 'Operativo',
                                        'goToAction': 'SUBMIT_FORM'  # Salta alle domande finali
                                    }
                                ]
                            }
                        }
                    }
                },
                'location': {'index': 0}
            }
        },
        {
            'createItem': {
                'item': {
                    'title': 'Domanda solo per ruoli gestionali: Come valuti la leadership?',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'scaleQuestion': {
                                'low': 1,
                                'high': 5,
                                'lowLabel': 'Scarsa',
                                'highLabel': 'Eccellente'
                            }
                        }
                    }
                },
                'location': {'index': 1}
            }
        }
    ]

    form.add_questions(questions_requests)
    form.update_question_map()
    
    return form

def org_form_builder(responses):
    enteName=responses["enteName"]
    tematica = responses['tematica']

    # ciclo for per creare dizionario domanda 4A (Approfondimento per ruoli direttivi) da "areeInterne"
    areeInterne=[{'value': opzione} for opzione in responses["areeInterne"]]
    progettiConclusi=[{'value': opzione} for opzione in responses["progettiConclusi"]]
    progettiConclusi.append({'value': 'Nessuna delle precedenti'})

    progettiInCorso=[{'value': opzione} for opzione in responses["progettiInCorso"]]
    progettiInCorso.append({'value': 'Nessuna delle precedenti'})

    form = GoogleForm(
        title=f'Network Choesion Index',
        description=f"Gentile partecipante,\n\n" \
        f"la ricerca a cui stai partecipando ha l'obiettivo di costruire una lettura dinamica e multidimensionale delle potenzialità di sviluppo di '{enteName}'," \
        f" con cui collabori, in particolare rispetto alla tematica '{tematica}'.\n\nPertanto, ti chiediamo di rispondere offrendo, per quanto possibile," \
        f" una lettura approfondita di come la realtà di cui fai parte contribuisce alla gestione di '{tematica}', a partire dal ruolo che ricopri al" \
        f" suo interno.\n\nI dati che offrirai non consentiranno mai di risalire all'identità dell'intervistato: verranno trattati ed elaborati esclusivamente dal" \
        f" team di DialogicaLab, e restituiti in forma aggregata ed anonima.\n\nIn relazione all'indirizzo mail dell'intervistato, si specifica che non verrà da noi" \
        f" raccolto, ma rimarrà nella disponibilità della piattaforma Google.\n\nPer qualunque domanda in merito alla presente indagine, puoi contattarci a questo" \
        f" indirizzo mail: ricerca@dialogica-lab.eu.\n\nTi ringraziamo per la partecipazione.\n\n\n" \
        f"Lo Staff di ricerca di DialogicaLab"
    )
    

    sections = {
        'requests': [
            {
                'createItem': {
                    'item': {
                        'title': 'Sezione Anagrafica',      #1A 1B
                        'description': '',
                        'pageBreakItem': {},
                    },
                    'location': {
                        'index': 0
                    }
                }
            },
            {
                'createItem': {
                    'item': {
                        'title': 'Informazioni generali',   #2A 2B
                        'description': 'In questa sezione, ti chiederemo alcune informazioni legate all\'area/dipartimento/divisione a cui il tuo ruolo fa riferimento',
                        'pageBreakItem': {},
                    },
                    'location': {
                        'index': 1
                    }
                }
            },
            {
                'createItem': {
                    'item': {
                        'title': f'Approfondimento per ruoli gestionali', #3A 3B 
                        'description': '',
                        'pageBreakItem': {},
                    },
                    'location': {
                        'index': 2
                    }
                }
            },
            {
                'createItem': {
                    'item': {
                        'title': f'Approfondimento per ruoli direttivi', #4A 
                        'description': '',
                        'pageBreakItem': {},
                    },
                    'location': {
                        'index': 3
                    }
                }
            },
            {
                'createItem': {
                    'item': {
                        'title': 'Attività, servizi, progetti, interventi dell\'organizzazione',    #5A 5B
                        'description': '',
                        'pageBreakItem': {},
                    },
                    'location': {
                        'index': 4
                    }
                }
            },
            {
                'createItem': {
                    'item': {
                        'title': f'Interazioni nell\'organizzazione in merito a "{tematica}"', #6A 6B 6C 6D 6E
                        'description': 'In questa sezione ti chiediamo di offrirci una tua lettura delle interazioni che l\'organizzazione'
                        ' ha/ha avuto al suo interno rispetto alla tematica di indagine.',
                        'pageBreakItem': {},
                    },
                    'location': {
                        'index': 5
                    }
                }
            }
        ]
    }

    # Aggiungiamo le sezioni e otteniamo gli ID
    section_ids = form.add_sections(sections)
    
    # Ora creiamo le domande con navigazione condizionale
    questions_requests = [
        # SEZIONE ANAGRAFICA
        {
            'createItem': {
                'item': {
                    'title': '1.A Età',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'choiceQuestion': {
                                'type': 'RADIO',
                                'options': [
                                    {'value': '18-25' },
                                    {'value': '26-29' },
                                    {'value': '30-35' },
                                    {'value': '36-40' },
                                    {'value': '41-49' },
                                    {'value': '50-59' },
                                    {'value': '60-69' },
                                    {'value': '> 70' }
                                ]
                            }
                        }
                    }
                },
                'location': {'index': 1}  # Dopo la prima sezione
            }
        },
        {
            'createItem': {
                'item': {
                    'title': '1.B Genere',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'choiceQuestion': {
                                'type': 'RADIO',
                                'options': [
                                    {'value': 'M' },
                                    {'value': 'F' },
                                    {'value': 'Altro'}
                                ]
                            }
                        }
                    }
                },
                'location': {'index': 2}
            }
        },
        #SEZIONE 2) "Informazioni generali"
        {
            'createItem': {
                'item': {
                    'title': '2.A Ruolo ricoperto all\'interno dell\'organizzazione',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'choiceQuestion': {
                                'type': 'RADIO',
                                'options': [
                                    {
                                        'value': 'Direttivo (CEO, CFO, Membro del CDA, Presidente, Dirigente ecc...)',
                                        'goToSectionId': section_ids[3] if len(section_ids) > 0 else None  # Approfondimento per ruoli direttivi
                                    },
                                    {
                                        'value': 'Gestionale (Manager, Coordinatore, Responsabile, Referente ecc...)',
                                        'goToSectionId': section_ids[2] if len(section_ids) > 0 else None  # Approfondimento per ruoli gestionali 
                                    },
                                    {
                                        'value': 'Operativo',
                                        'goToSectionId': section_ids[4] if len(section_ids) > 1 else None  # Attività, servizi, progetti, interventi dell'organizzazione
                                    },
                                    {
                                        'value': 'In formazione (tirocinio/stage)',
                                        'goToSectionId': section_ids[4] if len(section_ids) > 1 else None  # Attività, servizi, progetti, interventi dell'organizzazione
                                    },
                                    {
                                        'value': 'Volontario (anche Servizio Civile/Leva Civica)',
                                        'goToSectionId': section_ids[4] if len(section_ids) > 1 else None  # Attività, servizi, progetti, interventi dell'organizzazione
                                    }
                                ]
                            }
                        }
                    }
                },
                'location': {'index': 4}
            }
        },
        {
            'createItem': {
                'item': {
                    'title': '2.B Con quali enti territoriali esterni all’organizzazione ti interfacci per svolgere le attività previste?',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'textQuestion': {
                                'paragraph': True
                            }
                        }
                    }
                },
                'location': {'index': 5}
            }
        },
        
        # APPROFONDIMENTO PER RUOLI GESTIONALI
        {
            'createItem': {
                'item': {
                    'title': '3.A Quanti volontari (anche in servizio civile/leva civica) sono coinvolti nelle attività dell\'organizzazione?',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'choiceQuestion': {
                                'type': 'RADIO',
                                'options': [
                                    {'value': 'nessuno', 'goToSectionId': section_ids[4]},
                                    {'value': 'fino a 10', 'goToSectionId': section_ids[4]},
                                    {'value': 'da 10 a 30', 'goToSectionId': section_ids[4]},
                                    {'value': 'da 30 a 50', 'goToSectionId': section_ids[4]},
                                    {'value': 'tra 50 e 100', 'goToSectionId': section_ids[4]},
                                    {'value': 'oltre 100', 'goToSectionId': section_ids[4]},
                                ]
                            }
                        }
                    }
                },
                'location': {'index': 7}
            }
        },
        {
            'createItem': {
                'item': {
                    'title': '3.B Indica la/le fasce d\'età più rappresentate tra i volontari dell\'organizzazione.',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'choiceQuestion': {
                                'type': 'CHECKBOX',
                                'options': [
                                    {'value': '18-25'},
                                    {'value': '26-29'},
                                    {'value': '30-35'},
                                    {'value': '36-40'},
                                    {'value': '41-49'},
                                    {'value': '50-59'},
                                    {'value': '60-69'},
                                    {'value': '> 70'},
                                    {'value': 'Non coinvolgiamo volontari'},
                                ]
                            }
                        }
                    }
                },
                'location': {'index': 8}
            }
        },

        # APPROFONDIMENTO PER RUOLI DIRETTIVI
        {
            'createItem': {
                'item': {
                    'title': f'4.A Con quali aree/dipartimenti dell’organizzazione interagisci direttamente per contribuire alla gestione di "{tematica}" ?',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'choiceQuestion': {
                                'type': 'CHECKBOX',
                                'options': areeInterne
                            }
                        }
                    }
                },
                'location': {'index': 10}
            }
        },
        
        # SEZIONE Attività, servizi, progetti, interventi dell'organizzazione
        {
            'createItem': {
                'item': {
                    'title': '5.A Indica a quali, tra le seguenti attività/progetti, realizzati dall’area/dipartimento a cui appartieni, hai contribuito negli ultimi 3 anni',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'choiceQuestion': {
                                'type': 'CHECKBOX',
                                'options': progettiConclusi
                            }
                        }
                    }
                },
                'location': {'index': 12}  # Dopo la sezione operativa
            }
        },
        {
            'createItem': {
                'item': {
                    'title': '5.B Indica a quali, tra le seguenti attività/progetti in corso, realizzati dall’area/dipartimento a cui appartieni, stai contribuendo.',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'choiceQuestion': {
                                'type': 'CHECKBOX',
                                'options': progettiInCorso
                            }
                        }
                    }
                },
                'location': {'index': 13}  # Dopo la sezione operativa
            }
        },
        # ULTIMA SEZIONE: Interazioni nell'organizzazione in merito a [tematica di indagine]
        {
            'createItem': {
                'item': {
                    'title': f'6.A Descrivi almeno 3 punti deboli riscontrati nell’organizzazione in cui operi rispetto alla gestione di \"{tematica}\"',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'textQuestion': {
                                'paragraph': True
                            }
                        }
                    }
                },
                'location': {'index': 15}
            }
        },
        {
            'createItem': {
                'item': {
                    'title': f'6.B Descrivi almeno 3 punti di forza riscontrati nell’organizzazione in cui operi rispetto alla gestione di \"{tematica}\"',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'textQuestion': {
                                'paragraph': True
                            }
                        }
                    }
                },
                'location': {'index': 16}
            }
        },
        {
            'createItem': {
                'item': {
                    'title': f'6.C Considerando le tue precedenti risposte, quale apporto potrebbe dare il tuo ruolo per affrontare/migliorare \"{tematica}\" all’interno dell’organizzazione?',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'textQuestion': {
                                'paragraph': True
                            }
                        }
                    }
                },
                'location': {'index': 17}
            }
        },
        {
            'createItem': {
                'item': {
                    'title': f'6.D Quali sono gli ostacoli anticipati rispetto all’effettiva possibilità di dare il tuo apporto alla gestione di \"{tematica}\", nel ruolo che tu ricopri?',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'textQuestion': {
                                'paragraph': True
                            }
                        }
                    }
                },
                'location': {'index': 18}
            }
        },
        {
            'createItem': {
                'item': {
                    'title': f'6.E Quali strategie potresti adottare, nel ruolo che ricopri, per affrontare tali ostacoli?',
                    'questionItem': {
                        'question': {
                            'required': True,
                            'textQuestion': {
                                'paragraph': True
                            }
                        }
                    }
                },
                'location': {'index': 19}
            }
        },
    ]

    # Pulizia degli ID delle sezioni nulli e aggiunta delle domande
    cleaned_questions = []
    for question in questions_requests:
        question_item = question['createItem']['item'].get('questionItem', {})
        choice_question = question_item.get('question', {}).get('choiceQuestion', {})
        
        if 'options' in choice_question:
            for option in choice_question['options']:
                if 'goToSectionId' in option:
                    if option['goToSectionId'] is None:
                        # Rimuovi entrambe le chiavi se goToSectionId è None
                        del option['goToSectionId']
                    # In ogni caso, non inseriamo goToAction se non è necessario

        cleaned_questions.append(question)

    form.add_questions(cleaned_questions)
    form.update_question_map()
    
    return form


#%%
'''
from .form_builders import org_form_builder
responses={
            "assessmentName":doc.get("assessmentName", ""),
            "enteName":doc.get("enteName"),

            "tematica": doc.get("tematica", ""),
            "organizzazione": doc.get("organizzazione", ""),
            "formaGiuridica": doc.get("formaGiuridica", ""),
            "mission": doc.get("mission", ""),
            "areeInterne": doc.get("areeInterne", [""]) if doc.get("areeInterne") else [""],
            "progettiConclusi": doc.get("progettiConclusi", []),
            "progettiInCorso": doc.get("progettiInCorso", []),
            "areeCoinvolte": doc.get("areeCoinvolte", []),
            "grandezzaCampione": doc.get("grandezzaCampione", 0),
            "numeroRuoli": {
                "gestionale": doc.get("numeroRuoli", {}).get("gestionale", 0),
                "decisionale": doc.get("numeroRuoli", {}).get("decisionale", 0),
                "operativo": doc.get("numeroRuoli", {}).get("operativo", 0)
            }
}
form = org_form_builder(responses)

#%%
form.export_responses(output_dir='/Users/riccardo/Desktop/Network_Analysis/Network_Analysis/backend/google_survey')

'''