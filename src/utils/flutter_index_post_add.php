<?php session_start();

//require('../verif_auth.php');

require_once('../../Connections/Mycnx.php');

include('flutter_index_functions.php');

$erreur = '';

function up_error($code, $nom)
{
	//echo 'Code='.$code.' nom '.$nom.' ';
	switch ($code) {
		case '0':
			$erreur = '';
			$valid = true;
			break;
		case '1':
			$erreur = 'Votre fichier dépasse ' . get_cfg_var('upload_max_filesize') . ' Mo.';
			$valid = false;
			break;
		case '2':
			$erreur = 'Votre fichier dépasse ' . get_cfg_var('upload_max_filesize') . ' Mo.';
			$valid = false;
			break;
		case '3':
			$erreur = 'Votre fichier se charge partiellement.';
			$valid = false;
			break;
		//case '4' : $erreur = 'Aucun fichier téléchargé !!!';$valid = false;break; 
		default:
			$erreur = 'Le chargement a échoué.';
			$valid = false;
			break;
	}
	//echo 'valider='.$valid.' $erreur='.$erreur;
	$return[] = $valid;
	$return[] = $erreur;
	//echo $return[1];
	return $return;
}
;

function post_save($idmembre, $pdo, $post_fichier)
{

	$date = date("Y-m-d H:i:s");

	//$_POST['post_texte'] = urlencode($_POST['post_texte']);

	//$_POST['post_titre1'] = urlencode($_POST['post_titre1']);

	//$_POST['post_titre2'] = urlencode($_POST['post_titre2']);

	$rkt_insert = "INSERT INTO `post_contenu` (`idmembre`, `idtype`, `fichier`, `datecrea`, `memo`, `idcateg`, `lienvideo`, `thb`, `declarercarte`, `vue`, `titre_1`, `titre_2`) VALUES (" . $idmembre . ", '" . $_POST['fileType'] . "', '" . $post_fichier . "', '" . $date . "', '" . $_POST['post_texte'] . "', '0', '', '', 0, 0, '" . $_POST['post_titre1'] . "', '" . $_POST['post_titre2'] . "')";

	$stmt = $pdo->prepare($rkt_insert);

	$stmt->execute();

	$lastID_ = $pdo->lastInsertId();

	return $lastID_;
}
;

/*
if(isset($_POST['idmembre'])){ $idmembre = $_POST['idmembre']; };

if ($idmembre != 0)
{

	if(isset($_POST['post_texte']) && $_POST['post_texte'] != '')
	{

		//Save the Text if no file
		$post_allfiles = $_POST['post_allfiles'];

		echo('Type Fichier : '.gettype($_FILES['fichier']).' / Valeur : '.$_FILES['fichier'].' / taille : '.sizeof($_FILES['fichier']).' / All Files : '.$_POST['post_allfiles']);

		var_dump($_FILES['fichier']);

		if($post_allfiles == 0)
		{		
			$lastID = post_save($idmembre, $pdo, '');
		};

		if (isset($_FILES['fichier']) && $post_allfiles > 0) 
		{ 

			$compt = 0;
			$hautmax = 0;
			$largmax = 0; 
			$taillemax = 0;

			if(is_array($_FILES['fichier']))
			{
				//for($i = 0; $i < $_POST['post_allfiles']; $i++) //$_FILES['fichier']['name'] as $key => $value)
				foreach($_FILES['fichier']['name'] as $key => $value)
				{ 

					$compt++;

					$fichier = $_FILES['fichier']['name'][$key];//nom reel de l'image 
					$size    = $_FILES['fichier']['size'][$key]; //poids de l'image en octets 
					$tmp     = $_FILES['fichier']['tmp_name'][$key];//nom temporaire de l'image (sur le serveur) 
					$type    = $_FILES['fichier']['type'][$key];//type de l'image 
					$error   = $_FILES['fichier']['error'][$key]; 

					//echo ($i.' , '.$fichier.' , '.$size.' , '.$tmp.' , '.$type.' , '.$error);

					$retour = up_error($error,$fichier); 

					if ($retour[0] == true)
					{ 
						echo ($fichier.' , '.$size.' , '.$tmp.' , '.$type.' , '.$error.' | ');
					}
					else{ echo('Fichier : Erreur '.$retour[1]); }
				}
			}else{ echo 'Fichier : Pas Tableau'; }
		}else{ echo 'Fichier : non recu'; }

	}else{ echo 'Texte : non recu'; }

}
echo 'Fini OK';*/

$message = '';
$erreur = '';
$idmembre = $_POST['idmembre'];

if (isset($_POST['idmembre'])) {
	if (isset($_POST['post_texte']) && $_POST['post_texte'] != '') {
		$post_allfiles = $_POST['post_allfiles'];

		if ($post_allfiles == 0) {
			$lastID = post_save($idmembre, $pdo, '');
		}

		if (isset($_FILES['fichier']) && $post_allfiles > 0) {
			$compt = 0;
			$hautmax = 0;
			$largmax = 0;
			$taillemax = 0;

			if (is_array($_FILES['fichier'])) {
				foreach ($_FILES['fichier']['name'] as $key => $value) {

					$compt++;

					$fichier = $_FILES['fichier']['name'][$key]; //nom reel de l'image 
					$size = $_FILES['fichier']['size'][$key]; //poids de l'image en octets 
					$tmp = $_FILES['fichier']['tmp_name'][$key]; //nom temporaire de l'image (sur le serveur) 
					$type = $_FILES['fichier']['type'][$key]; //type de l'image 
					$error = $_FILES['fichier']['error'][$key];

					$retour = up_error($error, $fichier);

					if ($retour[0] == true) {

						$hautmax = 5000;
						$largmax = 5000;
						$taillemax = 100000000;

						//On récupère la taille de l'image 
						list($width, $height) = getimagesize($tmp);

						if (is_uploaded_file($tmp)) {
							if ($_POST['fileType'] == 1) {
								if ($size <= $taillemax && $width <= $largmax && $height <= $hautmax) {

									$fichier = preg_replace("` `i", "", $fichier);
									$ext = substr($fichier, (strlen($fichier) - 3));
									$nom_final = $idmembre . "_" . date("YmdHis") . "_" . $compt . "." . $ext;
									$photo = $nom_final;

									if (move_uploaded_file($tmp, './../../posts/images/' . $photo)) {

										$lastID = post_save($idmembre, $pdo, $photo);

									} else {
										$erreur = "Le chargement a échoué !";
									}
								} else {
									if ($size > $taillemax) {
										$erreur = 'Poids de l\'image trop grand ! Max ' . $size . ' Mo';
									}
									;
									if ($width > $largmax) {
										$erreur = 'Largeur de l\'image trop grande ! Max ' . $largmax . ' px';
									}
									;
									if ($height > $hautmax) {
										$erreur = 'Hauteur de l\'image trop grande ! Max ' . $hautmax . ' px';
									}
								}
							}

							if ($_POST['fileType'] == 2) {
								if ($size <= $taillemax) {

									$fichier = preg_replace("` `i", "", $fichier);
									$ext = substr($fichier, (strlen($fichier) - 3));
									$nom_final = $idmembre . "_" . date("YmdHis") . "_" . $compt . "." . $ext;
									$audio = $nom_final;

									if (move_uploaded_file($tmp, './../../posts/audios/' . $audio)) {

										$lastID = post_save($idmembre, $pdo, $audio);

									} else {
										$erreur = "Le chargement a échoué !";
									}
								} else {
									if ($size > $taillemax) {
										$erreur = 'Poids de l\'audio trop grand ! Max ' . $size . ' Mo';
									}
								}
							}

							if ($_POST['fileType'] == 3) {
								if ($size <= $taillemax) {
									$fichier = preg_replace("` `i", "", $fichier);
									$ext = substr($fichier, (strlen($fichier) - 3));
									$nom_final = $idmembre . "_" . date("YmdHis") . "_" . $compt . "." . $ext;
									$video = $nom_final;

									$date = date("Y-m-d H:i:s");

									if (move_uploaded_file($tmp, './../../posts/videos/' . $video)) {

										$lastID = post_save($idmembre, $pdo, $video);

									} else {
										$erreur = "Le chargement a échoué; !";
									}
								} else {
									if ($size > $taillemax) {
										$erreur = 'Poids de la video trop grande ! Max ' . $size . ' Mo';
									}
									;
								}
							}
						} else {
							@unlink($tmp);
							$erreur = 'Votre fichier n\'a pas été chargé !';
						}
					}

					if ($retour[0] == false) {
						$erreur = $retour[1];
					}
				}
			}
		}
	} else {
		$erreur = "Aucun texte !";
	}
} else {
	$erreur = "Vous n'êtes pas connecté";
}
;

if ($erreur == '')
	$message = '{"error":"0", "id":"' . $lastID . '", "fichier":"' . $nom_final . '"}';

if ($erreur != '')
	$message = '{"error":"1", "infos":"' . $erreur . '"}';

echo $message;
?>