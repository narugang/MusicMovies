var searchBtn = document.getElementById("search_btn");

searchBtn.addEventListener("click", function () {
  var keyword = document.getElementById("searchKeyword").value;
  alert(keyword + " " + "[ 준비중 입니다 ]");
});

var cateL = [
  "Adventure",
  "Drama",
  "Family",
  "Mystery",
  "Sci-Fi",
  "Action",
  "Crime",
  "Comedy",
  "Reality-TV",
  "Talk-Show",
  "Sport",
  "Biography",
  "History",
  "Fantasy",
  "War",
  "Romance",
  "Thriller",
  "Music",
  "Musical",
  "Western",
];

var cateA = document.getElementById("categoryArea");
var html = "";
for (var i in cateL) {
  html += `<span style="background: white; margin: 5px;  border-radius: 5px;">`;
  html += `"${cateL[i]}"`;
  html += `<input type="checkbox" id="${cateL[i]}" class="category" value="${cateL[i]}" onclick="click_chk(this)" />`;
  html += `</span>`;
  if (i == 5 || i == 10) {
    html += "<br><br>";
  }
}
cateA.innerHTML = html;

var requestURL = "https://yts.mx/api/v2/list_movies.json?sort_by=rating";
var request = new XMLHttpRequest();

request.open("GET", requestURL);
console.log(request);

request.responseType = "json";
request.send();

console.log(request);

//응답이 반환 된 후
request.onload = function () {
  //응답을 변수에 담는다. (movies)
  var movies = request.response;
  console.log(movies);

  //변수에 담은(movies)를 JS 객체에 포함한다.
  showMovies(movies);
};

// var infomation = new Array("title_long", "rating", "runtime");
// var infoName = new Array("title", "rating", "runtime");
// jsonObj.data.movies[i][infomation[j]];

//카테고리 리스트
function showMovies(jsonObj) {
  // var cateList = new Array();
  // for (i = 0; i < jsonObj.data.movies.length; i++) {
  //   for (j = 0; j < jsonObj.data.movies[i].genres.length; j++) {
  //     cateList += jsonObj.data.movies[i].genres[j];
  //   }
  // }

  for (i = 0; i < jsonObj.data.movies.length; i++) {
    var element = document.createElement("div");
    element.id = "testSec" + i;
    // element.textContent = jsonObj.data.movies[i].title_long;

    var addChild = document.getElementById("movieContent");
    addChild.appendChild(element);

    //Element 아래 하위 요소들
    var title = document.createElement("div");
    title.id = "title" + i;
    title.textContent = jsonObj.data.movies[i].title_long;

    var rating = document.createElement("div");
    rating.id = "rating" + i;
    rating.textContent = "평점 : " + jsonObj.data.movies[i].rating;

    var runtime = document.createElement("div");
    runtime.id = "runtime" + i;
    runtime.textContent = "상영 시간 : " + jsonObj.data.movies[i].runtime;

    var years = document.createElement("div");
    years.id = "year" + i;
    years.textContent = "year : " + jsonObj.data.movies[i].year;

    var img = document.createElement("img");
    img.id = "img" + i;
    img.src = jsonObj.data.movies[i].medium_cover_image;

    var summury = document.createElement("div");
    summury.id = "summ" + i;
    summury.style.width = "500px";
    summury.style.height = "550px";
    summury.style.backgroundColor = "white";
    summury.style.display = "none";
    summury.textContent = jsonObj.data.movies[i].description_full;

    var summuryBtn = document.createElement("button");
    summuryBtn.value = i;
    summuryBtn.onclick = function () {
      // div none -> flex 로 현 화면에서 보여주는 방법
      // if (
      //   (document.getElementById("summ" + this.value).style.display =
      //     "none")
      // ) {
      //   document.getElementById("summ" + this.value).style.display = "flex";
      // } else if (
      //   (document.getElementById("summ" + this.value).style.display =
      //     "flex")
      // ) {
      //   document.getElementById("summ" + this.value).style.display = "none";
      // }

      //windo.open() 을 이용해 새로운 창을 열고 그 곳에서 요약 내용을 보여주는 방법.
      if (
        (document.getElementById("summ" + this.value).style.display = "none")
      ) {
        var win = window.open(
          "",
          "_blank",
          "width=600px, height=300px, left=50%, top=50%"
        );
        var titleDiv = win.document.createElement("div");
        titleDiv.textContent = "summary";
        titleDiv.style.fontSize = "50px";

        // 카테고리를 보여주고 싶어(0516 시작할 것)

        var summaryText = win.document.createElement("div");
        summaryText.textContent = document.getElementById(
          "summ" + this.value
        ).textContent;

        // win.document.write(
        //   document.getElementById("summ" + this.value).textContent
        // );

        var winBtn = win.document.createElement("button");
        winBtn.textContent = "close";
        winBtn.onclick = function () {
          win.close();
        };
        win.document.body.appendChild(titleDiv);
        win.document.body.appendChild(summaryText);
        win.document.body.appendChild(winBtn);
      }
    };

    summuryBtn.textContent = "줄거리 보기";
    summuryBtn.id = "sumBtn" + i;
    summuryBtn.className = "sumBtn";

    // 만들어진 요소들을 movieContent\testSec\ 으로 append
    var underElement = document.getElementById("testSec" + i);
    underElement.appendChild(img);
    underElement.appendChild(title);
    underElement.appendChild(years);
    underElement.appendChild(rating);
    underElement.appendChild(runtime);
    underElement.appendChild(summuryBtn);
    underElement.appendChild(summury);
  }
}

var cateSearch_btn = document.getElementById("categorySearch");

var endchk = 3;
var srtchk = 0;
var count = 0;

function click_chk(ss) {
  // console.log(ss.checked);
  if (ss.checked) {
    count += 1;
  } else {
    count -= 1;
  }
  if (count > endchk) {
    alert("한 개 이상 3개 이하를 선택해 주세요");
    ss.checked = false;
    count -= 1;
  }
}
function reset() {
  count = 0;
}

cateSearch_btn.onclick = function () {
  var chkbox = document.getElementsByClassName("category");
  var chkarry = new Array();

  for (i = 0; i < chkbox.length; i++) {
    //search_btn을 눌렀을 때, 한 가지 이상 && 3가지 이하의 항목을 선택하도록

    //체크 된 항목의 value뽑기
    if (document.getElementsByClassName("category")[i].checked == true) {
      alert(document.getElementsByClassName("category")[i].value);
      chkarry.push(document.getElementsByClassName("category")[i].value);
    }
  }
  console.log(chkarry);
};
