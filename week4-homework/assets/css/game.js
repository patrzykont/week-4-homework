
var characterSelected = false;

var defenderSelected = false;

var character = {};

var defender = {};

var enemiesDefeated = 0;

gameOver = false;


var obiWanKenobi = {
  name: "Obi-Wan Kenobi",
  health: 120,
  baseAttack: 8,
  attack: 8
};

var lukeSkywalker = {
  name: "Luke Skywalker",
  health: 100,
  baseAttack: 5,
  attack: 5
};

var darthSidious = {
  name: "Darth Sidious",
  health: 150,
  baseAttack: 20,
  attack: 20
};

var jarjar = {
  name: "Jar Jar Binks",
  health: 180,
  baseAttack: 25,
  attack: 25
};


function initializeCharacter(chosenCharacter) {
  character.name = chosenCharacter.name;
  character.health = chosenCharacter.health;
  character.baseAttack = chosenCharacter.baseAttack;
  character.attack = chosenCharacter.attack;
}

function initializeDefender(chosenDefender) {
  defender.name = chosenDefender.name;
  defender.health = chosenDefender.health;
  defender.baseAttack = chosenDefender.baseAttack;
  defender.attack = chosenDefender.attack;
}

function moveToEnemies() {
  $(".available-character").removeClass("available-character").addClass("enemy-character");
  $("#enemies-available").append($(".enemy-character"));
}

function resetGame() {
  $("#obi-wan-kenobi-character").children(".health").html(obiWanKenobi.health);
  $("#luke-skywalker-character").children(".health").html(lukeSkywalker.health);
  $("#darth-sidious-character").children(".health").html(darthSidious.health);
  $("#jarjar-character").children(".health").html(jarjar.health);

  $(".character-image").removeClass("chosen-character enemy-character defender-character").addClass("available-character");
  var available = $(".available-character").show();
  $("#characters-available").html(available);

  $("#game-message").empty();
  $("#restart").hide();

  characterSelected = false;
  defenderSelected = false;
  enemiesDefeated = 0;
  gameOver = false;

  character = {};
  defender = {};
}


$(document).ready(function() {

 
  $("#restart").hide();

 
  $("#obi-wan-kenobi-character").on("click", function () {
    console.log("Obi-Wan Kenobi is selected");

    if(characterSelected == false) {
      $("#game-message").empty();

    
      initializeCharacter(obiWanKenobi);
      characterSelected = true;

      
      $("#obi-wan-kenobi-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      
      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {

      if($("#obi-wan-kenobi-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(obiWanKenobi);
        defenderSelected = true;

        $("#obi-wan-kenobi-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  $("#luke-skywalker-character").on("click", function () {
    console.log("Luke Skywalker is selected");

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(lukeSkywalker);
      characterSelected = true;

      $("#luke-skywalker-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {
      if($("#luke-skywalker-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(lukeSkywalker);
        defenderSelected = true;

        $("#luke-skywalker-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });
//not able tp get jar jar binks to intialize as a selectable character, dont know whats wrong with the code.
  $("#jarjar-character").on("click", function () {
    console.log("Jar Jar Binks is selected");

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(jarJar);
      characterSelected = true;

      $("#jarjar-character-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {

      if($("#jarjar-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(jarjar);
        defenderSelected = true;

        $("#jarjar-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });
  $("#darth-sidious-character").on("click", function () {
    console.log("Darth Sidious is selected");

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(darthSidious);
      characterSelected = true;

      $("#darth-sidious-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {

      if($("#darth-sidious-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(darthSidious);
        defenderSelected = true;

        $("#darth-sidious-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  

  $("#attack").on("click", function() {
    console.log("Attack selected");

    console.log("character = " + JSON.stringify(character));
    console.log("defender = " + JSON.stringify(defender));

    if (characterSelected && defenderSelected && !gameOver) {

      defender.health = defender.health - character.attack;
      $(".defender-character").children(".health").html(defender.health);
      $("#game-message").html("<p>You attacked " + defender.name + " for " + character.attack + " damage.<p>");

      character.attack = character.attack + character.baseAttack;

      
      if (defender.health > 0) {
        character.health = character.health - defender.baseAttack;
        $(".chosen-character").children(".health").html(character.health);

        if (character.health > 0) {
          $("#game-message").append("<p>" + defender.name + " attacked you back for " + defender.baseAttack + " damage.</p>");
        } else {
          gameOver = true;
          $("#game-message").html("<p>Do or do not, there is no try...</p><p>Play again?</p>");
          $("#restart").show();
        }
      } else {
        enemiesDefeated++;
        defenderSelected = false;
        $("#game-message").html("<p>You have defeated " + defender.name + ". Choose another enemy.</p>");
        $(".defender-character").hide();

\        if (enemiesDefeated === 3) {
          gameOver = true;
          $("#game-message").html("<p>You have mastered the force¡!</p><p>Play again?</p>");
          $("#restart").show();
        }
      }
    } else if (!characterSelected && !gameOver) {
      $("#game-message").html("<p>You must first select your game character.</p>");
    } else if (!defenderSelected && !gameOver) {
      $("#game-message").html("<p>You must choose an enemy to fight.</p>");
    }

    console.log("character = " + JSON.stringify(character));
    console.log("defender = " + JSON.stringify(defender));
  });

  $("#restart").on("click", function() {
    console.log("Restart selected");

    resetGame();
  });

}); 