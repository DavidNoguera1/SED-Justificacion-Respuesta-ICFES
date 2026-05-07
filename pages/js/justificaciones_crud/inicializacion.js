window.addEventListener('DOMContentLoaded', function() {
  var urlId = getIdFromUrl();
  if (urlId) {
    setVal('inputId', urlId);
  }
  
  if (typeof loadQuestionsForArea === 'function') {
    loadQuestionsForArea('mat');
  }
  
  if (urlId) {
    currentQuestionId = parseInt(urlId);
    cargarPregunta();
  }
});