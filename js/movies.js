//검색 버튼[S]
var searchBtn = document.getElementById("search_btn");

searchBtn.addEventListener("click", function () {
  var keyword = document.getElementById("searchKeyword").value;

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

  function showMovies(userSearch) {
    var userSearchContext = new Array();

    for (var i in userSearch.data.movies) {
      //요렇게 비교해서 검색하면 될 듯
      var userKey = keyword.toUpperCase();
      var jsonTitle = userSearch.data.movies[i].title.toUpperCase();

      console.log("사용자 검색어 : " + userKey);
      console.log("Jsonfile내용 : " + jsonTitle);
      console.log(
        "단어 비교 (-1) 아니면 중복이 있음 : " + jsonTitle.indexOf(userKey)
      );

      if (jsonTitle.indexOf(userKey) != -1) {
        userSearchContext.push(userSearch.data.movies[i]);
      }
      for (var j in userSearch.data.movies[i].genres) {
        var jsonGenres = userSearch.data.movies[i].genres[j].toUpperCase();
        console.log(jsonGenres.indexOf(userKey));
        if (jsonGenres.indexOf(userKey) != -1) {
          userSearchContext.push(userSearch.data.movies[i]);
        }
      }
      if (document.getElementById("testSec" + i) != null) {
        var oldDiv = document.getElementById("testSec" + i);
        oldDiv.remove();
      }
    }
    console.log(userSearchContext.length);
    for (i = 0; i < userSearchContext.length; i++) {
      var element = document.createElement("div");
      element.id = "testSec" + i;

      var addChild = document.getElementById("movieContent");
      addChild.appendChild(element);

      //Element 아래 하위 요소들
      var title = document.createElement("div");
      title.id = "title" + i;
      title.textContent = userSearchContext[i].title_long;

      var rating = document.createElement("div");
      rating.id = "rating" + i;
      rating.textContent = "평점 : " + userSearchContext[i].rating;

      var runtime = document.createElement("div");
      runtime.id = "runtime" + i;
      runtime.textContent = "상영 시간 : " + userSearchContext[i].runtime;

      var years = document.createElement("div");
      years.id = "year" + i;
      years.textContent = "year : " + userSearchContext[i].year;

      // genres[s]
      var genres = document.createElement("div");
      genres.id = "genres" + i;
      genres.textContent = "genres : " + userSearchContext[i].genres;
      // genres[e]

      var img = document.createElement("img");
      img.id = "img" + i;
      img.src = userSearchContext[i].medium_cover_image;

      var summury = document.createElement("div");
      summury.id = "summ" + i;
      summury.style.width = "500px";
      summury.style.height = "550px";
      summury.style.backgroundColor = "white";
      summury.style.display = "none";
      summury.textContent = userSearchContext[i].description_full;

      var summuryBtn = document.createElement("button");
      summuryBtn.value = i;
      summuryBtn.onclick = function () {
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
      underElement.appendChild(genres);
      underElement.appendChild(summuryBtn);
      underElement.appendChild(summury);
    }

    alert(
      "[" + keyword + "]" + " " + userSearchContext.length + "개 검색 완료"
    );
  }
});
//검색 버튼[E]

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

//카테고리 리스트
function showMovies(jsonObj) {
  console.log("window load에 실행되는거니?");
  //category List[s]
  var categoryList = new Array();
  for (i = 0; i < jsonObj.data.movies.length; i++) {
    for (j in jsonObj.data.movies[i].genres) {
      if (
        categoryList.length > 0 &&
        categoryList.indexOf(jsonObj.data.movies[i].genres[j]) == -1
      ) {
        categoryList.push(jsonObj.data.movies[i].genres[j]);
      } else if (categoryList.length == 0) {
        categoryList.push(jsonObj.data.movies[i].genres[j]);
      }
    }
    console.log(categoryList);
    //category List[e]

    var element = document.createElement("div");
    element.id = "testSec" + i;

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

    // genres[s]
    var genres = document.createElement("div");
    genres.id = "genres" + i;
    genres.textContent = "genres : " + jsonObj.data.movies[i].genres;
    // genres[e]

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
    underElement.appendChild(genres);
    underElement.appendChild(summuryBtn);
    underElement.appendChild(summury);
  }
  //category List[s]
  var cateA = document.getElementById("categoryArea");
  var html = "";

  for (var i in categoryList) {
    html += `<span style="background: white; margin: 5px;  border-radius: 5px;">`;
    html += `"${categoryList[i]}"`;
    html += `<input type="checkbox" id="${categoryList[i]}" class="category" value="${categoryList[i]}" onclick="click_chk(this)" />`;
    html += `</span>`;
    if (i == 5 || i == 10) {
      html += "<br><br>";
    }
  }
  cateA.innerHTML = html;
  //category List[e]
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

  function showMovies(ct) {
    var chkGenres = new Array();
    //genres 맞춤 검색
    for (i = 0; i < ct.data.movies.length; i++) {
      for (j = 0; j < ct.data.movies[i].genres.length; j++) {
        for (k = 0; k < chkarry.length; k++) {
          if (ct.data.movies[i].genres[j] == chkarry[k]) {
            console.log(ct.data.movies[i]);
            chkGenres.push(ct.data.movies[i]);
            console.log(ct.data.movies[i].genres[j]);
            console.log("collect data!");
          }
        }
      }
    }
    console.log(chkGenres);

    for (i = 0; i < ct.data.movies.length; i++) {
      var tesS = document.getElementById("testSec" + i);
      if (tesS) {
        tesS.remove();
      }
    }

    for (i = 0; i < chkGenres.length; i++) {
      var element = document.createElement("div");
      element.id = "testSec" + i;

      var addChild = document.getElementById("movieContent");
      addChild.appendChild(element);

      //Element 아래 하위 요소들
      var title = document.createElement("div");
      title.id = "title" + i;
      title.textContent = chkGenres[i].title_long;

      var rating = document.createElement("div");
      rating.id = "rating" + i;
      rating.textContent = "평점 : " + chkGenres[i].rating;

      var runtime = document.createElement("div");
      runtime.id = "runtime" + i;
      runtime.textContent = "상영 시간 : " + chkGenres[i].runtime;

      var years = document.createElement("div");
      years.id = "year" + i;
      years.textContent = "year : " + chkGenres[i].year;

      // genres[s]
      var genres = document.createElement("div");
      genres.id = "genres" + i;
      genres.textContent = "genres : " + chkGenres[i].genres;
      // genres[e]

      var img = document.createElement("img");
      img.id = "img" + i;
      img.src = chkGenres[i].medium_cover_image;

      var summury = document.createElement("div");
      summury.id = "summ" + i;
      summury.style.width = "500px";
      summury.style.height = "550px";
      summury.style.backgroundColor = "white";
      summury.style.display = "none";
      summury.textContent = chkGenres[i].description_full;

      var summuryBtn = document.createElement("button");
      summuryBtn.value = i;
      summuryBtn.onclick = function () {
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
      underElement.appendChild(genres);
      underElement.appendChild(summuryBtn);
      underElement.appendChild(summury);
    }
  }
};
