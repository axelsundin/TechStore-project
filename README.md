# TechStore-Project
(TechStoreTest (första namnet) 

## Samarbete i grupp
I projektet TechStore har följande personer ingått med angivna roller:
Axel Sundin - utvecklare
Susan Isaksson - projektledare

## Vad gör projektet?
Vi har skapat en mindre webbshop med två sidor (index.html och varukorg.html), för ett fiktivt företag "TechStore" som gör det möjligt att:
- välja ur produktsortimentet som presenteras på startsidan (index.html) - med produktnamn, produktinformation, bild och pris
- lägga till vald produkt i varukorgen. (antalet valda produkter visas i "countern" i "headern")
- ta bort vald produkt från varukorgen. (antalet justeras då i "countern" i "headern")
- slutföra köpet
- få en bekräftelse att köpet genomförts

I huvudsak har html, css och javascript använts i projektet. JSON har använts för produkterna och localstorage som sparfunktion samt "fontawesome" för samtliga iconer. 

### JSON

#### .vscode / {}settings.json
{
    "liveServer.settings.port": 0000 (portnr ?)
}

#### {} product.json
[
    {
        "title": "produktnamn",
        "description": "produktinformation.",
        "image": "produktbild.png",
        "price": pris
    },
]

### Fontawesome
<script src="https://kit.fontawesome.com/700b16a244.js" crossorigin="anonymous"></script>

## Förbättringar
Vi har valt att lägga till en förbättring i vårt projekt. Förbättringen är att varukorgen/kundvagnen töms i samband med att köpet bekräftas. Bekräftelserutan stängs ner och tillbaka på varukorgssidan (varukorg.html) har knappen "Slutför ditt köp" ersatts med texten "Din varukorg är tom".

Denna förbättring kan motiveras med att det kändes som en naturlig följd i köpprocessen i vårt projekt. 
I övrigt har kravspecen följts. 

## Länk till vårt GitHub Repository
https://github.com/axelsundin/TechStore-project.git
