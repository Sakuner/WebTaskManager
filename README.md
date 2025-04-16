# WebTaskManager

Prosta aplikacja prezentująca przypisywanie zadań użytkownikom. Zalecane odpalanie najpierw backendu, a potem frontu przez ng serve. <br> <br>

Zadanie zacząłem od backendu. Jako, że jest to mały projekt to zdecydowałem o użyciu minimal api i zostawienie logiki domenowej w endpointach. Podzieliłem backend na warstwy typu endpointy, modele, utility. Jako, że dane miały być mockowane dodałem do tego generator tasków. <br>
Po przejściu na frontend, wygenerowałem serwisy i modele z backendu za pomocą openapi, co pomogło ze spójnością. Założyłem, że najpierw potrzebuje listy użytkowników i dopiero po wybraniu któregoś z nich będą pobierane taski. W aplikacji użytkownik wprowadza zmiany dotyczące przypisanych zadań, ale te zmiany są zapisywane dopiero po naciśnięciu przycisku "Zapisz". Aby zapewnić przejrzystość i kontrolę nad procesem przypisywania zadań, zaprojektowałem system z podziałem na trzy kategorie zadań: z podziałem na dostępne, zapisane i w toku. Dzięki temu podejściu użytkownik ma pełną kontrolę nad tym, które zmiany są widoczne, a które są w trakcie edycji, a jednocześnie zapobiega to przypadkowemu utraceniu niezapisanych zmian. <br>
Na koniec dodałem proste komunikaty o błędach oraz walidacje czy użytkownik zamyka strone przed zapisaniem zmian.  <br> <br>



Rzeczy które bym przemyślał/zaadoptował gdyby był to projekt na większą skalę, z potrzebą dalszego utrzymywania: <br>
-rozwinięcie clean architecture na backendzie między innymi poprzez jaśniejszy podział na warstwy - projekty (np. WebApi, Application, Domain) zamiast na same foldery, dodanie kontrolerów i serwisów do łączności z bazą danych,  <br>
-w przypadku podłączenia do bazy odróżnienie encji domenowych od obiektów przesyłanych (dto) <br>
-zastosowanie wzorca CQRS dla jasnego podziału odpowiedzialności i lepszej skalowalności <br>
-dependency Injection zamiast statycznych serwisów <br>
-testy jednostkowe <br> <br>
Front: <br> 
-zdecydowana poprawa wyglądu aplikacji <br>
-dodanie spinnerów/loaderów w celu informowaniu użytkownika o pobieraniu danych <br>
-paginacja <br>
-dodanie walidacji od strony klienta <br>
-obsługa błedów z backendu poprzez toasty z bardziej dokładną informacją <br>



