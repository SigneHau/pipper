

````markdown
# Pipper

## Arbejdsgang med GitHub

### 1. Opret repository på GitHub
Det første jeg gør er at oprette et **nyt repository** på GitHub.  
Herefter kan jeg tilføje samarbejdspartnere ved at **invitere dem til mit repository** under *Settings → Collaborators*.  

---

### 2. Lav projektmappe i VS Code
Jeg laver en ny mappe i **Visual Studio Code** og tilføjer min kode.  

I terminalen i VS Code kører jeg følgende for at sætte mit lokale projekt op og sende det til GitHub første gang:

```bash
git init
git add .
git commit -m "første commit"
git branch -M main
git remote add origin https://github.com/SigneHau/pipper.git
git push -u origin main
````

---

### 3. Hvordan mine medstuderende henter projektet første gang

Når de skal lave deres **første træk**, så **cloner** de projektet fra GitHub:

```bash
git clone https://github.com/SigneHau/pipper.git
```

Nu har de en kopi af hele projektet lokalt på deres computer.

---

### 4. Når man har tilføjet kode (ændringer)

Hvis jeg eller mine medstuderende ændrer i projektet, så skal ændringerne **pushes** op til GitHub.
Det gøres sådan her:

```bash
git add .
git commit -m "beskrivelse af ændringen"
git push
```

---

### 5. Når man vil hente andres ændringer

Hvis jeg vil have de nyeste ændringer som mine medstuderende har lagt op, så kører jeg:

```bash
git pull
```

---

👉 **Opsummering**

* Første gang: `git clone`
* Når du ændrer filer: `git add .`, `git commit -m "besked"`, `git push`
* For at hente andres ændringer: `git pull`

```


API
 

Navigér til den korrekte mappe: Åbn din terminal og brug kommandoen cd til at navigere til den mappe, der indeholder din server-fil (f.eks. mappen public). 

- Start serveren: Kør kommandoen php -S 127.0.0.1:8000 i terminalen. 

- Serveren kører nu. 

- Tjek din api.js: Sørg for at URL'en i din fetch-funktion peger direkte på din server-fil 

- Dobbelttjek dine headers: I din PHP-fil skal du sikre dig, at dine header()-kald er øverst i filen, og at der ikke er nogen mellemrum eller blanke linjer før <?php. 

 