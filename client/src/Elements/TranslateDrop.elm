module Elements.TranslateDrop exposing (view)

import Html exposing (Html, div, span, text, a)
import Html.Events exposing (onClick)
import Html.Attributes exposing (class, href) 

import Services.Translate.Keys exposing (TranslationKey(..))
import Services.Translate.Main exposing (translate, tagToString, LanguageTag(..))
import Services.Core.Model exposing (Model)
import Services.Core.Messages exposing (Msg(..))



view : Model -> Html Msg
view model =
    div [ class "navbar-item has-dropdown is-hoverable" ]
        [ a [ href "", class "navbar-link" ] [ text <| tagToString model.language ]
        , div [ class "navbar-dropdown" ]
            [ a [ href "", class "navbar-item", onClick <| ChangeLanguage FR ] [ text "Français" ]
            , a [ href "", class "navbar-item", onClick <| ChangeLanguage EN ] [ text "English" ]
            ]
        ]